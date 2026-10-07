/* =====================================================
   KeepSwagAlive
   Main JavaScript
   Version 3.0
   Matching CSS Version 3+
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

            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-xmark");

        }


    });


}


/* Close mobile menu when clicking links */

document.querySelectorAll(".nav-links a")
.forEach(link=>{


    link.addEventListener("click",()=>{


        if(navMenu){

            navMenu.classList.remove("active");

        }


        const icon =
        menuToggle?.querySelector("i");


        if(icon){

            icon.classList.add("fa-bars");
            icon.classList.remove("fa-xmark");

        }


    });


});



/* Close menu when clicking outside */


document.addEventListener("click",(e)=>{


    if(
        navMenu &&
        menuToggle &&
        !navMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
    ){

        navMenu.classList.remove("active");


        const icon =
        menuToggle.querySelector("i");


        if(icon){

            icon.classList.add("fa-bars");
            icon.classList.remove("fa-xmark");

        }

    }


});




/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */


const nav =
document.querySelector(".nav");


window.addEventListener("scroll",()=>{


    if(!nav) return;


    nav.classList.toggle(
        "scrolled",
        window.scrollY > 50
    );


});





/* =====================================================
   SMOOTH SCROLL
===================================================== */


document.querySelectorAll(
'a[href^="#"]'
)
.forEach(anchor=>{


anchor.addEventListener(
"click",
function(e){


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
   SCROLL REVEAL ANIMATION
   Matches CSS .hidden / .show
===================================================== */


const observer =
new IntersectionObserver(

(entries)=>{


entries.forEach(entry=>{


    if(entry.isIntersecting){


        entry.target.classList.add("show");


        observer.unobserve(
            entry.target
        );


    }


});


},

{

threshold:.15

}

);



const animatedElements =
document.querySelectorAll(

`
.hero-container,
.section-header,
.release-card,
.album-card,
.spotify-card,
.video-wrapper,
.merch-card,
.bio-content,
.fanclub-content,
.booking-form,
.social
`

);



animatedElements.forEach(element=>{


    element.classList.add("hidden");


    observer.observe(element);


});







/* =====================================================
   WELCOME EMAIL POPUP
===================================================== */


const welcomePopup =
document.getElementById(
"welcomePopup"
);


const closeWelcome =
document.getElementById(
"closeWelcome"
);


const emailOfferForm =
document.getElementById(
"emailOfferForm"
);


const discountCode =
document.getElementById(
"discountCode"
);




function openWelcomePopup(){


    if(welcomePopup){

        welcomePopup.classList.add(
            "active"
        );


        document.body.style.overflow =
        "hidden";

    }


}



function closeWelcomePopup(){


    if(welcomePopup){

        welcomePopup.classList.remove(
            "active"
        );


        document.body.style.overflow =
        "";

    }


}




/* Show for new visitors, then again after 7 days */

const WELCOME_COOLDOWN =
    7 * 24 * 60 * 60 * 1000;

const WELCOME_STORAGE_KEY =
    "ksaWelcomeLastShown";

function welcomePopupIsDue(){

    const lastShown =
        Number(
            localStorage.getItem(
                WELCOME_STORAGE_KEY
            ) || "0"
        );

    return (
        !lastShown ||
        Date.now() - lastShown >= WELCOME_COOLDOWN
    );
}

function rememberWelcomePopupShown(){

    localStorage.setItem(
        WELCOME_STORAGE_KEY,
        String(Date.now())
    );
}

if(
    welcomePopup &&
    welcomePopupIsDue()
){

    setTimeout(()=>{

        rememberWelcomePopupShown();
        openWelcomePopup();

    },1500);

}




if(closeWelcome){


closeWelcome.addEventListener(
"click",
()=>{


    closeWelcomePopup();


});


}




/* Close popup clicking outside */


if(welcomePopup){


welcomePopup.addEventListener(
"click",
(e)=>{


    if(
        e.target === welcomePopup
    ){

        closeWelcomePopup();

    }


});


}





/* =====================================================
   FIREBASE DATABASE HELPERS
===================================================== */

const ksaFirebase = window.KSA_FIREBASE || null;
const ksaDb = ksaFirebase ? ksaFirebase.db : null;
const ksaStorage = ksaFirebase ? ksaFirebase.storage : null;

async function saveKsaDocument(collection, data){
    if(!ksaDb) throw new Error("Firebase database is not initialized.");
    return ksaDb.collection(collection).add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        site: "keepswagalive.com"
    });
}

function cleanValue(value){
    return typeof value === "string" ? value.trim() : value;
}

/* Email discount submit */


if(emailOfferForm){


emailOfferForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const email =
document.getElementById(
"customerEmail"
).value;



try{


await saveKsaDocument("fanMembers", {
    name: "",
    email: cleanValue(email),
    source: "discount",
    type: "discount_signup"
});

if(true){



rememberWelcomePopupShown();



if(discountCode){

discountCode.innerHTML =
`
Your discount code:<br>
<strong>KSA10</strong>
`;

}



setTimeout(()=>{


closeWelcomePopup();


},3000);



}else{


throw new Error();

}



}catch(error){



if(discountCode){

discountCode.textContent =
"Unable to generate discount. Try again.";

}



console.error(
"Popup signup error:",
error
);



}



});


}
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


const fanMessage =
document.getElementById("fanMessage");




function openFanModal(){


    if(fanModal){

        fanModal.classList.add(
            "active"
        );


        document.body.style.overflow =
        "hidden";

    }


}




function closeFanClubModal(){


    if(fanModal){

        fanModal.classList.remove(
            "active"
        );


        document.body.style.overflow =
        "";

    }


}



if(fanButton){


fanButton.addEventListener(
"click",
()=>{


    openFanModal();


});


}




if(closeFanModal){


closeFanModal.addEventListener(
"click",
()=>{


    closeFanClubModal();


});


}




if(fanModal){


fanModal.addEventListener(
"click",
(e)=>{


if(
    e.target === fanModal
){


    closeFanClubModal();


}


});


}





/* FAN CLUB SIGNUP */


if(fanForm){


fanForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const formData =
new FormData(
fanForm
);



const data = {


name:
formData.get("name"),


email:
formData.get("email"),


source:
"fanclub"


};



try{


await saveKsaDocument("fanMembers", {
    name: cleanValue(data.name),
    email: cleanValue(data.email),
    source: data.source,
    type: "fan_club"
});

if(true){



if(fanMessage){

fanMessage.textContent =
"Welcome to The JIGGY SHI* ONLY CLUB!";

}



fanForm.reset();



setTimeout(()=>{


closeFanClubModal();


},2500);



}else{


throw new Error();


}



}catch(error){



if(fanMessage){

fanMessage.textContent =
"Signup failed. Please try again.";

}



console.error(
"Fan signup:",
error
);



}



});


}







/* =====================================================
   BOOKING FORM
===================================================== */


const bookingForm =
document.getElementById(
"bookingForm"
);


const bookingButton =
document.getElementById(
"bookingSubmit"
);


const bookingMessage =
document.getElementById(
"bookingMessage"
);




if(bookingForm){


bookingForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



if(bookingButton){

bookingButton.disabled =
true;


bookingButton.classList.add(
"loading"
);


}



const formData =
new FormData(
bookingForm
);



try{


await saveKsaDocument("bookings", {
    name: cleanValue(formData.get("name")),
    email: cleanValue(formData.get("email")),
    event: cleanValue(formData.get("event")),
    location: cleanValue(formData.get("location")),
    message: cleanValue(formData.get("message")),
    status: "new"
});

if(true){


if(bookingMessage){

bookingMessage.textContent =
"Booking request sent successfully.";

bookingMessage.className =
"success";


}


bookingForm.reset();


}else{


throw new Error();


}




}catch(error){



if(bookingMessage){

bookingMessage.textContent =
"Something went wrong. Please try again.";

bookingMessage.className =
"error";


}



console.error(
"Booking error:",
error
);



}




if(bookingButton){


bookingButton.disabled =
false;


bookingButton.classList.remove(
"loading"
);


}



});


}






/* =====================================================
   PAYMENT SYSTEM
===================================================== */


const buyButtons =
document.querySelectorAll(
".buy-btn"
);


const paymentModal =
document.getElementById(
"paymentModal"
);


const closePayment =
document.getElementById(
"closePayment"
);


const selectedProduct =
document.getElementById(
"selectedProduct"
);


const proofProduct =
document.getElementById(
"proofProduct"
);




buyButtons.forEach(button=>{


button.addEventListener(
"click",
()=>{


const product =
button.dataset.product;


const price =
button.dataset.price;



if(selectedProduct){

selectedProduct.textContent =
`${product} - $${price}`;

}



if(proofProduct){

proofProduct.value =
`${product} - $${price}`;

}



if(paymentModal){

paymentModal.classList.add(
"active"
);


document.body.style.overflow =
"hidden";


}



});


});






function closePaymentModal(){


if(paymentModal){

paymentModal.classList.remove(
"active"
);


document.body.style.overflow =
"";


}


}




if(closePayment){


closePayment.addEventListener(
"click",
()=>{


closePaymentModal();


});


}





if(paymentModal){


paymentModal.addEventListener(
"click",
(e)=>{


if(
e.target === paymentModal
){


closePaymentModal();


}


});


}
/* =====================================================
   ORDER NUMBER GENERATOR
===================================================== */


function generateOrderNumber(){


    const date =
    new Date();


    const random =
    Math.floor(
        10000 +
        Math.random() * 90000
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

        random

    );


}




const orderNumber =
document.getElementById(
"orderNumber"
);



if(orderNumber){


    orderNumber.value =
    generateOrderNumber();


}






/* =====================================================
   PAYMENT PROOF FORM
===================================================== */


const paymentProofForm =
document.getElementById(
"paymentProofForm"
);


const orderMessage =
document.getElementById(
"orderMessage"
);




if(paymentProofForm){

paymentProofForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

if(orderMessage){
    orderMessage.innerHTML = "Uploading your payment proof...";
}

try{
    if(!ksaDb || !ksaStorage){
        throw new Error("Firebase is not initialized.");
    }

    const fd = new FormData(paymentProofForm);
    const file = fd.get("receipt");
    const orderNumber = cleanValue(fd.get("order-number")) || `KSA-${Date.now()}`;
    const customerName = cleanValue(fd.get("customer-name"));
    const customerEmail = cleanValue(fd.get("customer-email"));
    const product = cleanValue(fd.get("product"));
    const paymentMethod = cleanValue(fd.get("payment-method"));

    let receiptUrl = "";
    let receiptPath = "";

    if(file && file.size){
        if(file.size > 10 * 1024 * 1024){
            throw new Error("Receipt image must be 10MB or smaller.");
        }
        const safeName = String(file.name || "receipt").replace(/[^a-zA-Z0-9._-]/g, "_");
        receiptPath = `payment-receipts/${orderNumber}-${Date.now()}-${safeName}`;
        const upload = await ksaStorage.ref(receiptPath).put(file, {contentType: file.type || "image/jpeg"});
        receiptUrl = await upload.ref.getDownloadURL();
    }

    await saveKsaDocument("payments", {
        orderNumber,
        customerName,
        customerEmail,
        product,
        paymentMethod,
        receiptUrl,
        receiptPath,
        status: "pending_verification"
    });

    if(orderMessage){
        orderMessage.innerHTML = `Thank you for your order.<br>Your payment proof has been securely submitted and is being verified.`;
    }
    paymentProofForm.reset();
}catch(error){
    console.error("Payment proof Firebase error:", error);
    if(orderMessage){
        orderMessage.innerHTML = `Payment proof could not be submitted.<br>${error.message || "Please try again."}`;
    }
}

});

}




/* =====================================================
   ZELLE COPY FUNCTION
===================================================== */


function copyZelle(){


const zelleDetails =
document.getElementById(
"zelleDetails"
);



if(
    !zelleDetails
) return;



navigator.clipboard.writeText(
    zelleDetails.innerText
);



alert(
"Zelle payment details copied!"
);



}



window.copyZelle =
copyZelle;






/* =====================================================
   CONFIRM PAYMENT BUTTON
===================================================== */


const confirmPayment =
document.querySelector(
".confirm-payment"
);



if(confirmPayment){


confirmPayment.addEventListener(
"click",
()=>{


if(orderMessage){


orderMessage.innerHTML =

`
Payment confirmation received.<br>
Your order is being processed.
`;



}



});


}







/* =====================================================
   MERCH TOUCH EFFECT
   Mobile image switching
===================================================== */


document.querySelectorAll(
".merch-card"
)
.forEach(card=>{


card.addEventListener(
"touchstart",
()=>{


card.classList.toggle(
"active"
);


},
{
passive:true
}

);


});







/* =====================================================
   IMAGE PERFORMANCE
===================================================== */


document.querySelectorAll(
"img"
)
.forEach(image=>{


if(
    !image.hasAttribute(
        "loading"
    )
){

image.setAttribute(
"loading",
"lazy"
);


}


});







/* =====================================================
   DISABLE RIGHT CLICK ON IMAGES
   Optional Artist Protection
===================================================== */


document.querySelectorAll(
".hero-bg, .album-img"
)
.forEach(image=>{


image.addEventListener(
"contextmenu",
(e)=>{


e.preventDefault();


});


});






/* =====================================================
   ESC KEY CLOSE ALL MODALS
===================================================== */


document.addEventListener(
"keydown",
(e)=>{


if(
e.key === "Escape"
){



document
.querySelectorAll(
".fan-modal.active, .payment-modal.active, .welcome-popup.active"
)
.forEach(modal=>{


modal.classList.remove(
"active"
);


});



document.body.style.overflow =
"";



}



});






/* =====================================================
   PREVENT DOUBLE FORM SUBMISSIONS
===================================================== */


document.querySelectorAll(
"form"
)
.forEach(form=>{


form.addEventListener(
"submit",
()=>{


const button =
form.querySelector(
"button[type='submit']"
);



if(button){


setTimeout(()=>{


button.disabled =
false;


},3000);



}



});


});






/* =====================================================
   PAGE READY LOG
===================================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


console.log(
"KeepSwagAlive Website Loaded - Version 3.0"
);


});
