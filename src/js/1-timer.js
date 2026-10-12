import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePicker = document.querySelector('#datetime-picker'),
      startButton = document.querySelector('[data-start]'),
      days = document.querySelector('[data-days]'),
      hours = document.querySelector('[data-hours]'),
      minutes = document.querySelector('[data-minutes]'),
      seconds = document.querySelector('[data-seconds]');

let userSelectedDate = null;      

const options = {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
        if (selectedDates[0] && selectedDates[0] > new Date()) {
            userSelectedDate = selectedDates[0];

            startButton.disabled = false;
        } else if (selectedDates[0]) {
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight',
                timeout: 3000,

                class: 'custom-error-toast',

                backgroundColor: '#ef4040',
                titleColor: '#fff',
                messageColor: '#fff',

                progressBar: false,
                close: true,

                transitionIn: 'fadeInDown',
                transitionOut: 'fadeOutUp',
            });

            startButton.disabled = true;
        } else {
            startButton.disabled = true;
        }
  },
};

flatpickr(dateTimePicker, options);

function convertMs(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);

    return { days, hours, minutes, seconds };
}

function startCountdown() {
    const timerId = setInterval(() => {
        const diff = userSelectedDate - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
            dateTimePicker.disabled = false;
            days.textContent = '00';
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
            return;
        }
        const time = convertMs(diff);

        days.textContent = String(time.days).padStart(2, '0');
        hours.textContent = String(time.hours).padStart(2, '0');
        minutes.textContent = String(time.minutes).padStart(2, '0');
        seconds.textContent = String(time.seconds).padStart(2, '0');
    }, 1000)

    startButton.disabled = true;
    dateTimePicker.disabled = true;
}

startButton.addEventListener('click', startCountdown);

