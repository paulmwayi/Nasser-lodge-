var guestName = '';
var guestPhone = '';
var guestEmail = '';
var selectedProvider = null;
var paymentAmount = 0;
var bookingId = null;
var bookingRef = null;
var pollingTimer = null;
var maxPollAttempts = 40;
var pollAttempts = 0;

var ROOM_RATES = {
  'Standard Room': 500,
  'Deluxe Room': 750,
  'Executive Suite': 1200
};

var PROVIDER_NAMES = { airtel: 'Airtel Money', mtn: 'MTN Mobile Money', zamtel: 'Zamtel Kwacha' };

function formatDateReadable(iso) {
  if (!iso) return '-';
  var parts = iso.split('-');
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return parts[2] + ' ' + months[parseInt(parts[1])-1] + ' ' + parts[0];
}

function setStep(n) {
  document.querySelectorAll('.booking-step').forEach(function(el) {
    var s = parseInt(el.dataset.step);
    el.classList.remove('booking-step--active', 'booking-step--done');
    if (s < n) el.classList.add('booking-step--done');
    if (s === n) el.classList.add('booking-step--active');
  });
}

document.getElementById('booking-form').addEventListener('submit', function(e) {
  e.preventDefault();
  var checkin = document.getElementById('checkin').value;
  var checkout = document.getElementById('checkout').value;
  var roomType = document.getElementById('room-type').value;
  guestName = document.getElementById('fullname').value.trim();
  guestPhone = document.getElementById('phone').value.trim();
  guestEmail = guestPhone.replace(/[^0-9]/g, '') + '@guest.nasserlodge.com';
  if (!guestName || !guestPhone || !checkin || !checkout || !roomType) return;

  window._checkin = checkin;
  window._checkout = checkout;
  window._roomType = roomType;
  window._nights = Math.max(1, Math.round((new Date(checkout) - new Date(checkin)) / 86400000));
  window._totalPrice = window._nights * ROOM_RATES[roomType];

  var pc = document.getElementById('payment-column');
  pc.style.opacity = '1';
  pc.style.pointerEvents = 'auto';
  setStep(2);

  document.getElementById('fullname').disabled = true;
  document.getElementById('phone').disabled = true;
  document.getElementById('checkin').disabled = true;
  document.getElementById('checkout').disabled = true;
  document.getElementById('room-type').disabled = true;
  document.getElementById('submit-btn').textContent = 'Details Saved';
  document.getElementById('submit-btn').disabled = true;
  document.getElementById('submit-btn').style.opacity = '0.6';

  pc.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// --- PAYMENT POPUP ---
function initiatePayment(provider) {
  if (!guestName) return;
  selectedProvider = provider;

  document.querySelectorAll('.wallet-card').forEach(function(c) { c.classList.remove('wallet-card--selected'); });
  document.querySelector('.wallet-card[data-provider="' + provider + '"]').classList.add('wallet-card--selected');

  var suggested = Math.ceil(window._totalPrice * 0.5);
  document.getElementById('popup-title').textContent = 'Pay with ' + PROVIDER_NAMES[provider];
  document.getElementById('popup-suggested').textContent = 'ZMW ' + suggested.toLocaleString();
  document.getElementById('popup-amount').value = suggested;
  document.getElementById('popup-display').textContent = 'ZMW ' + suggested.toLocaleString();
  document.getElementById('amount-error').textContent = '';

  document.getElementById('popup-amount').oninput = function() {
    var v = parseInt(this.value) || 0;
    document.getElementById('popup-display').textContent = 'ZMW ' + v.toLocaleString();
  };

  resetPopupSteps();
  document.getElementById('popup-overlay').classList.add('popup-overlay--visible');
}

function resetPopupSteps() {
  document.getElementById('popup-step-amount').style.display = 'block';
  document.getElementById('popup-step-waiting').style.display = 'none';
  document.getElementById('popup-step-success').style.display = 'none';
  document.getElementById('popup-step-failed').style.display = 'none';
  document.getElementById('popup-spinner').style.display = 'none';
  document.getElementById('waiting-error').textContent = '';
  document.getElementById('amount-error').textContent = '';
  document.getElementById('pay-now-btn').disabled = false;
}

function closePopup() {
  stopPolling();
  document.getElementById('popup-overlay').classList.remove('popup-overlay--visible');
}

function stopPolling() {
  if (pollingTimer) {
    clearInterval(pollingTimer);
    pollingTimer = null;
  }
  pollAttempts = 0;
}

async function confirmAndPay() {
  var amount = parseInt(document.getElementById('popup-amount').value);
  if (!amount || amount < 1) {
    document.getElementById('amount-error').textContent = 'Please enter a valid amount.';
    return;
  }
  paymentAmount = amount;

  document.getElementById('pay-now-btn').disabled = true;
  document.getElementById('pay-now-btn').textContent = 'Processing...';
  document.getElementById('amount-error').textContent = '';

  try {
    var res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: guestName,
        phone: guestPhone,
        email: guestEmail,
        room: window._roomType,
        checkin: window._checkin,
        checkout: window._checkout,
        nights: window._nights,
        total: window._totalPrice,
        paymentMethod: PROVIDER_NAMES[selectedProvider],
        deposit: paymentAmount
      })
    });

    var data = await res.json();

    if (!data.success) {
      document.getElementById('amount-error').textContent = data.error || 'Booking failed.';
      if (res.status === 409) {
        document.getElementById('amount-error').textContent = 'Room already booked for these dates.';
      }
      document.getElementById('pay-now-btn').disabled = false;
      document.getElementById('pay-now-btn').textContent = 'Pay Now';
      return;
    }

    bookingId = data.booking.id;
    bookingRef = data.booking.ref;

    document.getElementById('popup-step-amount').style.display = 'none';
    document.getElementById('popup-step-waiting').style.display = 'block';
    document.getElementById('popup-spinner').style.display = 'block';
    document.getElementById('waiting-title').textContent = 'Confirm on Your Phone';
    document.getElementById('waiting-msg').textContent =
      'A payment request of ZMW ' + paymentAmount.toLocaleString() +
      ' has been sent to your phone via ' + PROVIDER_NAMES[selectedProvider] +
      '. Please check your phone and enter your mobile money PIN to confirm.';
    document.getElementById('waiting-error').textContent = '';

    startPolling();

  } catch (err) {
    document.getElementById('amount-error').textContent = 'Network error. Please try again.';
    document.getElementById('pay-now-btn').disabled = false;
    document.getElementById('pay-now-btn').textContent = 'Pay Now';
  }
}

function startPolling() {
  stopPolling();
  pollAttempts = 0;
  pollingTimer = setInterval(checkPaymentStatus, 3000);
}

async function checkPaymentStatus() {
  pollAttempts++;
  if (pollAttempts > maxPollAttempts) {
    stopPolling();
    showPaymentFailed('Payment confirmation is taking too long. Check your phone or try again.');
    return;
  }
  try {
    var res = await fetch('/api/payments?bookingId=' + bookingId);
    var data = await res.json();
    if (data.success && data.paid) {
      stopPolling();
      showPaymentSuccess();
    }
  } catch (e) {}
}

function showPaymentSuccess() {
  document.getElementById('popup-step-waiting').style.display = 'none';
  document.getElementById('popup-spinner').style.display = 'none';
  document.getElementById('success-msg').textContent =
    'ZMW ' + paymentAmount.toLocaleString() + ' sent to Nasser Lodge via ' + PROVIDER_NAMES[selectedProvider] + '.';
  document.getElementById('popup-step-success').style.display = 'block';
  setStep(3);
}

function showPaymentFailed(msg) {
  document.getElementById('popup-step-waiting').style.display = 'none';
  document.getElementById('popup-spinner').style.display = 'none';
  document.getElementById('failed-msg').textContent = msg || 'We did not receive your payment confirmation.';
  document.getElementById('popup-step-failed').style.display = 'block';
}

function cancelWaiting() {
  stopPolling();
  closePopup();
}

function retryPayment() {
  resetPopupSteps();
  document.getElementById('popup-overlay').classList.add('popup-overlay--visible');
  var suggested = Math.ceil(window._totalPrice * 0.5);
  document.getElementById('popup-title').textContent = 'Pay with ' + PROVIDER_NAMES[selectedProvider];
  document.getElementById('popup-suggested').textContent = 'ZMW ' + suggested.toLocaleString();
  document.getElementById('popup-amount').value = suggested;
  document.getElementById('popup-display').textContent = 'ZMW ' + suggested.toLocaleString();
  document.getElementById('amount-error').textContent = '';
}

function showReceiptFromPayment() {
  closePopup();
  showReceipt();
}

// --- RECEIPT ---
function showReceipt() {
  var now = new Date();
  var dateStr = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) +
    ' ' + now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  var checkinReadable = formatDateReadable(window._checkin || '');
  var checkoutReadable = formatDateReadable(window._checkout || '');
  var deposit = paymentAmount || Math.ceil(window._totalPrice * 0.5);

  document.getElementById('receipt-ref').textContent = bookingRef;
  document.getElementById('receipt-ref2').textContent = bookingRef;
  document.getElementById('receipt-name').textContent = guestName;
  document.getElementById('receipt-phone').textContent = '+260 ' + guestPhone;
  document.getElementById('receipt-method').textContent = PROVIDER_NAMES[selectedProvider] || '-';
  document.getElementById('receipt-date').textContent = dateStr;
  document.getElementById('receipt-room').textContent = window._roomType || '-';
  document.getElementById('receipt-checkin').textContent = checkinReadable;
  document.getElementById('receipt-checkout').textContent = checkoutReadable;
  document.getElementById('receipt-nights').textContent = (window._nights || 1) + ((window._nights === 1) ? ' night' : ' nights');
  document.getElementById('receipt-rate').textContent = 'ZMW ' + (ROOM_RATES[window._roomType] || 0).toLocaleString();
  document.getElementById('receipt-total').textContent = 'ZMW ' + (window._totalPrice || 0).toLocaleString();
  document.getElementById('receipt-amount').textContent = 'ZMW ' + deposit.toLocaleString();
  document.getElementById('receipt-balance').textContent = 'ZMW ' + ((window._totalPrice || 0) - deposit).toLocaleString();

  var svg = document.getElementById('receipt-barcode');
  var bars = '';
  var seed = 0;
  for (var i = 0; i < (bookingRef||'').length; i++) { seed += bookingRef.charCodeAt(i); }
  for (var j = 0; j < 30; j++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    var w = (seed % 3) > 1 ? 2 : 1;
    var h = 30 + (seed % 20);
    bars += '<rect x="' + (j * 6.5) + '" y="' + (50 - h) + '" width="' + w + '" height="' + h + '" fill="#1a1a1a"/>';
  }
  svg.innerHTML = bars;

  document.getElementById('receipt-overlay').classList.add('receipt-overlay--visible');
  document.getElementById('receipt-overlay').scrollIntoView({ behavior: 'smooth' });
}

function closeReceipt() {
  document.getElementById('receipt-overlay').classList.remove('receipt-overlay--visible');
}

document.getElementById('receipt-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeReceipt();
});

document.getElementById('popup-overlay').addEventListener('click', function(e) {
  if (e.target === this) closePopup();
});

(function() {
  var today = new Date().toISOString().split('T')[0];
  var ci = document.getElementById('checkin');
  var co = document.getElementById('checkout');
  ci.setAttribute('min', today);
  ci.addEventListener('change', function() { co.setAttribute('min', this.value); });
  co.addEventListener('change', function() { ci.setAttribute('max', this.value); });
})();

document.querySelector('.nav__toggle').addEventListener('click', function() {
  document.querySelector('.nav__links').classList.toggle('nav__links--open');
  this.classList.toggle('nav__toggle--open');
});

document.getElementById('current-year').textContent = new Date().getFullYear();
