import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const delay = event.target.elements.delay.value;
    const state = event.target.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve();
            } else {
                reject();
            }
        },delay);
    });

    promise
        .then(() => {
            iziToast.success({
                title: "Success",
                message: `Promise fulfilled after ${delay}ms`,
                iconColor: '#fff',
            });
        })
        .catch(() => {
            iziToast.error({
                title: "Error",
                message: `Promise rejected after ${delay}ms`,
                iconColor: '#fff',
            })
        })
    form.reset();
})