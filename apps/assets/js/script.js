const scriptURL = 'https://script.google.com/macros/s/AKfycbxpWdxcaCx8BuNgF_BTQSeSpPJFQ1wZMSQ4CdGeWH9e6IuzU3g9RUYYNeURLpFh0Twh/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))
})