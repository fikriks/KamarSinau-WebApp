import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SdModuleDetailPage = () => {
  return (
    <div className="container">
      <h1>Matematika</h1>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              BAB 1 Pecahan dan Desimal
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              https://drive.google.com/file/d/19yTNXkUFmC85YagWEA1j0dfvTtWDHn3z/view?usp=drive_link
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              BAB II Rasio
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              https://drive.google.com/file/d/1A3MzR0NZIpULgn4XLN1Ke3pgujZiHbsO/view?usp=drive_link
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              BAB III Kubus dan Balok
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              https://drive.google.com/file/d/19zMmEu6oa067egVaACVE5TRaZl7gbbFr/view?usp=drive_link
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingFour">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              BAB IV Peluang
            </button>
          </h2>
          <div
            id="collapseFour"
            class="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body text-start">
              <iframe title={'frame-module'}
                src="https://drive.google.com/file/d/1YVYFTLrFm29X1NPflqxpHFyKojImjW3Z/preview"
                width="600"
                height="700"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SdModuleDetailPage;
