import React from "react";
import "./Faq.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Faq() {
    return (
        <div id="faq">
            <div id="Title">
                <h1>FAQ</h1>
                <p>Frequently asked questions</p>
            </div>
            <div className="body">
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                1. Can I pay online for consultation?
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong> Yes.</strong>  you can pay with online using bank card. we are using trending payment gateway to collect payments in any case you had a trouble with payment you can send us a email regarding issue with a proof. Regarding payment details we don’t collect any otp codes or your pin numbers so please don’t share those privacy details with any of our agents.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                2. Can we partnered with you?
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong> Yes. </strong>you can partner with us. we are looking for partners who can help us to grow our business and we can help them to grow their business. To partner with us you can send us a email with your business details and how you can help us to grow our business.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                3. Can we get instant answers?
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                We always try to give you instant answers but in some cases we need to do some research to give you the best answer. So, in some cases you may need to wait for some time to get the answer. We always try to give you the best answer as soon as possible.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Faq;
