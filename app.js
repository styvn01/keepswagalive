/* =====================================================
   KeepSwagAlive
   Main JavaScript
   Version 2.0
===================================================== */


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


if(menuToggle && navMenu){

    menuToggle.addEventListener("click",()=>{

        navMenu.classList.toggle("active");

        const icon = menuToggle.querySelector("i");


        if(icon){

            if(navMenu.classList.contains("active")){

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            }else{

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

}



/* Close menu after selecting link */

document.querySelectorAll(".nav-links a")
.forEach(link=>{

    link.addEventListener("click",()=>{

        if(navMenu){

            navMenu.classList.remove("active");

        }


        if(menuToggle){

            const icon =
            menuToggle.querySelector("i");


            if(icon){

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

});





/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */


const nav = document.querySelector(".nav");


window.addEventListener("scroll",()=>{


    if(!nav) return;


    if(window.scrollY > 50){

        nav.classList.add("scrolled");

    }else{

        nav.classList.remove("scrolled");

    }


});





/* =====================================================
   SMOOTH SCROLL
===================================================== */


document.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{


    anchor.addEventListener("click",function(e){


        const target =
        document.querySelector(
            this.getAttribute("href")
        );


        if(target){

            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        }


    });


});





/* =====================================================
   LAZY LOAD EMBEDS
===================================================== */


document.querySelectorAll("iframe")
.forEach(frame=>{

    frame.setAttribute(
        "loading",
        "lazy"
    );

});





/* =====================================================
   SCROLL ANIMATION
===================================================== */


const observer =
new IntersectionObserver((entries)=>{


    entries.forEach(entry=>{


        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }


    });


},{

    threshold:.15

});



const animatedElements =
document.querySelectorAll(

    ".hero-container, " +
    ".section, " +
    ".album-card, " +
    ".spotify-card, " +
    ".video-wrapper, " +
    ".merch-card, " +
    ".booking-form, " +
    ".social"

);



animatedElements.forEach(element=>{

    element.classList.add("hidden");

    observer.observe(element);

});





/* =====================================================
   MERCH MOBILE IMAGE SWITCH
===================================================== */


const merchCards =
document.querySelectorAll(".merch-card");


merchCards.forEach(card=>{


    card.addEventListener("touchstart",()=>{


        card.classList.toggle("active");


    });


});





/* =====================================================
   FAN CLUB MODAL
===================================================== */


const fanButton =
document.getElementById("fanclubBtn");


const fanModal =
document.getElementById("fanModal");


const closeFanModal =
document.getElementById("closeFanModal");


const fanForm =
document.getElementById("fanForm");




if(fanButton && fanModal){


    fanButton.addEventListener("click",()=>{

        fanModal.classList.add("active");

    });


}



if(closeFanModal){


    closeFanModal.addEventListener("click",()=>{


        fanModal.classList.remove("active");


    });


}



if(fanModal){


    fanModal.addEventListener("click",(e)=>{


        if(e.target === fanModal){

            fanModal.classList.remove("active");

        }


    });


}




if(fanForm){

fanForm.addEventListener("submit", async (e)=>{

    e.preventDefault();


    const formData =
    new FormData(fanForm);


const data = {

    name: formData.get("name"),

    email: formData.get("email"),

    source:"fanclub"

};



    const fanMessage =
    document.getElementById("fanMessage");



    try{


        const response =
        await fetch(
        "/.netlify/functions/signup",
        {

            method:"POST",

            headers:{

                "Content-Type":
                "application/json"

            },

            body:
            JSON.stringify(data)

        });



        const result =
        await response.json();



        if(result.success){


            fanMessage.textContent =
            "Welcome to The JIGGY SHI* ONLY CLUB!";


            fanForm.reset();



            setTimeout(()=>{

                fanModal.classList.remove("active");

            },2000);



        }else{


            throw new Error();

        }



    }catch(error){


        fanMessage.textContent =
        "Signup failed. Please try again.";


        console.error(
        "Fan signup error:",
        error
        );


    }


});


}





/* =====================================================
   BOOKING FORM
===================================================== */


const bookingForm =
document.getElementById("bookingForm");


const bookingButton =
document.getElementById("bookingSubmit");


const bookingMessage =
document.getElementById("bookingMessage");




if(bookingForm){


bookingForm.addEventListener("submit",
async(e)=>{


    e.preventDefault();


    if(bookingButton){

        bookingButton.disabled=true;

        bookingButton.classList.add("loading");

    }



    const formData =
    new FormData(bookingForm);



    try{


        const response =
        await fetch("/",{

            method:"POST",

            headers:{

                "Content-Type":
                "application/x-www-form-urlencoded"

            },

            body:
            new URLSearchParams(formData)
            .toString()

        });



        if(response.ok){


            if(bookingMessage){

                bookingMessage.textContent =
                "Booking request sent successfully.";

                bookingMessage.className="success";

            }


            bookingForm.reset();



        }else{


            throw new Error();


        }



    }catch(error){


        if(bookingMessage){

            bookingMessage.textContent =
            "Something went wrong. Please try again.";

            bookingMessage.className="error";

        }


    }



    if(bookingButton){

        bookingButton.disabled=false;

        bookingButton.classList.remove("loading");

    }



});


}





/* =====================================================
   PAYMENT SYSTEM
===================================================== */


const buyButtons =
document.querySelectorAll(".buy-btn");


const paymentModal =
document.getElementById("paymentModal");


const closePayment =
document.getElementById("closePayment");


const selectedProduct =
document.getElementById("selectedProduct");



buyButtons.forEach(button=>{


    button.addEventListener("click",()=>{


        const product =
        button.dataset.product;


        const price =
        button.dataset.price;



        if(selectedProduct){

            selectedProduct.textContent =
            `${product} - $${price}`;

        }



        const proofProduct =
        document.getElementById("proofProduct");



        if(proofProduct){

            proofProduct.value =
            `${product} - $${price}`;

        }



        if(paymentModal){

            paymentModal.classList.add("active");

        }


    });


});





if(closePayment){


closePayment.addEventListener("click",()=>{


    paymentModal.classList.remove("active");


});


}





if(paymentModal){


paymentModal.addEventListener("click",(e)=>{


    if(e.target === paymentModal){

        paymentModal.classList.remove("active");

    }


});


}





/* =====================================================
   ORDER NUMBER
===================================================== */


function generateOrderNumber(){


    const date =
    new Date();


    const number =
    Math.floor(
        10000 +
        Math.random()*90000
    );


    return (

        "KSA-" +

        date.getFullYear() +

        String(
        date.getMonth()+1
        ).padStart(2,"0") +

        String(
        date.getDate()
        ).padStart(2,"0") +

        "-" +

        number

    );


}



const orderInput =
document.getElementById("orderNumber");



if(orderInput){

    orderInput.value =
    generateOrderNumber();

}





/* =====================================================
   PAYMENT CONFIRMATION
===================================================== */


const paymentForm =
document.getElementById("paymentProofForm");


const orderMessage =
document.getElementById("orderMessage");



if(paymentForm){


paymentForm.addEventListener("submit",()=>{


    if(orderMessage){


        orderMessage.innerHTML =
        `
        Thank you for your order.<br>
        Your payment is being verified.
        `;


    }


});


}





/* =====================================================
   ZELLE COPY
===================================================== */


function copyZelle(){

    const zelleInfo =
    document.getElementById("zelleDetails").innerText;


    navigator.clipboard.writeText(zelleInfo);


    alert(
    "Zelle payment details copied!"
    );

}


window.copyZelle = copyZelle;

/* =====================================================
   WELCOME EMAIL DISCOUNT POPUP
===================================================== */

const welcomePopup =
document.getElementById("welcomePopup");

const closeWelcome =
document.getElementById("closeWelcome");

const emailOfferForm =
document.getElementById("emailOfferForm");

const discountCode =
document.getElementById("discountCode");


/* Show popup only once */

if (
    welcomePopup &&
    !localStorage.getItem("ksaEmailPopup")
) {

    setTimeout(() => {

        welcomePopup.classList.add("active");

    }, 3000);

}


/* Close popup */

if (closeWelcome) {

    closeWelcome.addEventListener("click", () => {

        welcomePopup.classList.remove("active");

    });

}


/* Submit email */

if (emailOfferForm) {

    emailOfferForm.addEventListener("submit", async (e) => {


    e.preventDefault();

    const email =
    document.getElementById(
    "customerEmail"
    ).value;


    const data = {

        email: email,

        source:"discount"

    };


    try{


        const response =
        await fetch(
        "/.netlify/functions/signup",
        {

            method:"POST",

            headers:{

                "Content-Type":
                "application/json"

            },

            body:
            JSON.stringify(data)

        });


        const result =
        await response.json();



        if(result.success){



            localStorage.setItem(

                "ksaEmailPopup",

                email

            );



            discountCode.innerHTML =

            `
            Your discount code:<br>
            <strong>KSA10</strong>
            `;



        }else{


            throw new Error();


        }





    }catch(error){



        discountCode.innerHTML =

        `
        Unable to generate discount.
        Please try again.
        `;



        console.error(
        "Discount signup error:",
        error
        );


    }



});


}