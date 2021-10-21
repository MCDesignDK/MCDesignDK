$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Developer", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Developer", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});

// Contact 
const express = require('express')
const api = express.Router()
const nodemailer = require('nodemailer')
const myEmail = 'marcuschristiansen@outlook.dk'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: 'noex.nodemailer@gmail.com',
        pass: 'eaaamailer'
    },
    tls: {
        rejectUnauthorized: false
    }
})

api.post('/api/mail', (req, res) => {
    transporter.sendMail({
        from: req.body.email,
        to: myEmail,
        subject: 'Portfolio mail from: ' + req.body.email,
        text: req.body.text
    }, (err, info) => {
        if (err){
            console.log(err)
            res.json({succes: false})
        } else {
            console.log(info)
            res.json({succes: true})
        }
    })
})

    window.sendMail = () => {
        let form = document.querySelector('.contactContainer form')

        let email = form.querySelector('#email').value
        let text = form.querySelector('#text').value

        if (email.length < 5) {
            alert('Please write an email')
            return
        } else if (text.length === 0){
            alert('Please write a message')
            return
        }

        let mail = {
            email: email,
            text: text,
        }

        fetch( __ENV + '/api/mail', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mail)
        })
            .then(res => res.json())
            .then(data => {
                console.log(1)
                if (data.succes === true){
                    alert('Mail sent')
                } else {
                    alert('An error occured')
                }
            })
    }