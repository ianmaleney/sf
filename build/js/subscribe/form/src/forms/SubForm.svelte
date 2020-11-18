<script>
  export let formType = undefined;
  import { beforeUpdate, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import FormFieldset from "../form-elements/FormFieldset.svelte";
  import StripeElement from "../form-elements/StripeElement.svelte";
  import Spinner from "../form-elements/Spinner.svelte";
  import handle_sca_confirmation from "../utilities/handleScaConfirmation";

  let gift = false;
  let closed = false;

  const meta = {
    current_number: document.querySelector(".meta").dataset.current,
    current_title: document.querySelector(".meta").dataset.title,
    next_issue_number:
      parseInt(document.querySelector(".meta").dataset.current) + 1,
    next_issue_title: `Issue ${
      parseInt(document.querySelector(".meta").dataset.current) + 1
    } / Volume 2`,
    current_book: "Modern Times by Cathy Sweeney (Available now)",
    next_book: "Trouble by Philip Ó Ceallaigh (Available March 2021)",
  };
  let inputs = {
    contact_inputs: [
      {
        name: "first_name",
        label: "First Name",
        type: "text",
        required: true,
        classes: "half-width",
      },
      {
        name: "last_name",
        label: "Last Name",
        type: "text",
        required: true,
        classes: "half-width",
      },
      {
        name: "email",
        label: "Email",
        type: "text",
        required: true,
        classes: "full-width",
      },
    ],
    gifter_inputs: [
      {
        name: "gifter_first_name",
        label: "First Name",
        type: "text",
        required: true,
        classes: "half-width",
      },
      {
        name: "gifter_last_name",
        label: "Last Name",
        type: "text",
        required: true,
        classes: "half-width",
      },
      {
        name: "gifter_email",
        label: "Email",
        type: "text",
        required: true,
        classes: "full-width",
      },
    ],
    address_inputs: [
      {
        name: "address_line1",
        label: "Address Line 1",
        type: "text",
        required: true,
        classes: "full-width",
      },
      {
        name: "address_line2",
        label: "Address Line 2",
        type: "text",
        required: true,
        classes: "full-width",
      },
      {
        name: "address_city",
        label: "City",
        type: "text",
        classes: "third-width",
      },
      {
        name: "address_postcode",
        label: "Postcode",
        type: "text",
        classes: "third-width",
      },
      {
        name: "address_country",
        label: "Country",
        type: "text",
        classes: "third-width",
      },
      {
        name: "heading",
        type: "heading",
        label: "Select your delivery region",
      },
      {
        type: "radio",
        name: "delivery",
        input_id: "irl",
        value: "irl",
        checked: true,
        label: "Ireland & Northern Ireland",
      },
      {
        type: "radio",
        name: "delivery",
        input_id: "row",
        value: "row",
        checked: false,
        label: "Rest of the World",
      },
    ],
    mag_inputs: [
      {
        type: "radio",
        input_id: "current_issue",
        name: "issue",
        value: meta.current_number,
        disabled: false,
        checked: true,
        label: `${meta.current_title}`,
      },
      {
        type: "radio",
        input_id: "next_issue",
        name: "issue",
        value: meta.next_issue_number,
        disabled: false,
        checked: false,
        label: `${meta.next_issue_title}: Summer 2021 (Available May 2021)`,
      },
    ],
    book_inputs: [
      {
        type: "radio",
        input_id: "current_book",
        name: "book",
        value: meta.current_book,
        disabled: false,
        checked: true,
        label: meta.current_book,
      },
      {
        type: "radio",
        input_id: "next_book",
        name: "book",
        value: meta.next_book,
        disabled: false,
        checked: false,
        label: meta.next_book,
      },
    ],
    start_inputs: [],
  };
  let comments = {
    contact_comment: "The name and email address of the recipient",
    gifter_comment:
      "We’ll need your name and email address too, just so we can send you a receipt.",
    address_comment: {
      magonly: "This is the address where we’ll be sending the issues.",
      bookonly: "This is the address where we’ll be sending the books.",
      magbook:
        "This is the address where we’ll be sending the magazine issues and books during the year.",
      patron:
        "This is the address where we’ll be sending the magazine issues and books during the year.",
    },
    start_comment: {
      magonly:
        "You can choose to have your subscription start with the current issue, or the next issue. Magazine subscriptions last for one year and include two issues of the magazine.",
      bookonly:
        "You can choose to have your subscription start with the current title, or the next one. Book subscriptions include two books as they are published.",
      magbook:
        "You can choose which issue and book you want your subscription to start with. Your subscription will last for one year and you will receive two issues of the magazine and two books.",
      patron:
        "You can choose which issue and book you want your patron's subscription to start with. We will then send you a copy of each new issue and book as it is published.",
    },
  };
  let messages = {
    customer_exists: {
      title: "Something has gone wrong...",
      message:
        "It seems we already have a customer with that email address – are you trying to renew your subscription? Subscriptions renew automatically, so there's no need to resubscribe. If you believe there's a problem, contact us at web.stingingfly@gmail.com.",
      link: "#",
      button_text: "Try Again?",
    },
    unknown_error: {
      title: "Something has gone wrong...",
      message:
        "There's a problem somewhere, contact us at web.stingingfly@gmail.com.",
      link: "#",
      button_text: "Try Again?",
    },
    payment_failed: {
      title: "There's a problem with your card",
      message:
        "It seems your card has been declined for some reason. Please try another.",
      link: "#",
      button_text: "Try Again?",
    },
    success: {
      title: "Success!",
      message:
        "You have successfully subscribed to The Stinging Fly. You will receive a receipt and an email with your login details shortly. Happy reading!",
      link: "/",
      button_text: "Return To The Stinging Fly",
    },
  };

  let modal = {
    display: false,
    data: messages.success,
  };

  const handleFormSubmit = (e) => {
    closed = true;
  };

  const handleFormSuccess = (e) => {
    closed = false;
    modal.display = true;
  };

  const handle_checkout = (data, stripe, errorElement) => {
    stripe
      .redirectToCheckout({
        sessionId: data.id,
      })
      .then(function (result) {
        if (result.error) {
          errorElement.textContent = result.error.message;
          return;
        } else {
          modal.display = true;
        }
      });
  };

  const handleFormFailure = async (e) => {
    let { res, card, stripe, errorElement } = e.detail;
    closed = false;
    console.log({ res });
    switch (res.message) {
      case "Existing Customer":
        modal.data = messages.customer_exists;
        modal.display = true;
        break;

      case "payment_failed":
        modal.data = messages.payment_failed;
        modal.display = true;
        break;

      case "confirmation_needed":
        handle_sca_confirmation(
          res.data.client_secret,
          card,
          stripe,
          errorElement,
          () => (modal.display = true)
        );
        break;

      case "session_created":
        handle_checkout(res.data, stripe);
        break;

      default:
        modal.data = messages.unknown_error;
        modal.display = true;
        break;
    }
  };

  beforeUpdate(() => {
    if (formType === "patron") {
      gift = false;
    }
    // Set Start Inputs
    if (formType === "magonly") {
      inputs.start_inputs = inputs.mag_inputs;
    } else if (formType === "bookonly") {
      inputs.start_inputs = inputs.book_inputs;
    } else {
      inputs.start_inputs = [...inputs.mag_inputs, ...inputs.book_inputs];
    }

    if (gift) {
      inputs.start_inputs = [
        ...inputs.start_inputs,
        {
          type: "date",
          label: "On what date should the gift subscription begin?",
          name: "gift_start_date",
        },
      ];
    }
  });

  onMount(() => fetch(`https://enigmatic-basin-09064.herokuapp.com/wakeup`));
</script>

<style>
  #payment-form {
    margin-top: 80px;
  }
  .closed {
    opacity: 0.5;
    pointer-events: none;
  }

  .modal {
    width: 100vw;
    height: 100vh;
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 997;
  }
  .modal__underlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 998;
  }
  .modal__text {
    background-color: white;
    max-width: 720px;
    padding: 20px;
    margin: 20px;
    text-align: center;
    z-index: 999;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.5);
  }
  .modal__text > * {
    font-family: "IBM Plex Sans Condensed";
  }
  .modal__text h2 {
    font-size: 2.8rem;
    text-decoration: underline;
  }
  .modal__text a {
    display: inline-block;
    margin: 16px 0;
    border: 2px solid black;
    padding: 12px 36px;
    font-size: 1.6rem;
    border-radius: 4px;
    font-weight: 800;
    color: black;
  }
  .modal__text a:hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }
</style>

{#if formType}
  <form
    action=""
    method="post"
    class="payment-form"
    id="payment-form"
    class:closed>
    <!-- Gift Toggle -->
    {#if formType !== 'patron'}
      <FormFieldset
        f_id="sub_gift_toggle"
        f_legend="Is this subscription for you, or someone else?">
        <input
          type="radio"
          name="gift"
          id="gift_no"
          bind:group={gift}
          value={false}
          checked />
        <label for="gift_no">It's For Me</label>
        <input
          type="radio"
          name="gift"
          id="gift_yes"
          bind:group={gift}
          value={true} />
        <label for="gift_yes">It's A Gift</label>
      </FormFieldset>
    {/if}

    <!-- Subscriber Contact Details -->
    <FormFieldset
      f_id="sub_contact"
      f_legend="Who should we send it to?"
      inputs={inputs.contact_inputs}
      comment={comments.contact_comment} />

    <!-- Gifter Contact Details -->
    {#if gift == true}
      <FormFieldset
        f_id="sub_gifter"
        f_legend="Your Contact Details"
        inputs={inputs.gifter_inputs}
        comment={comments.gifter_comment} />
    {/if}

    <!-- Subscriber Address Details -->
    <FormFieldset
      f_id="sub_address"
      f_legend="Where should we send it?"
      inputs={inputs.address_inputs}
      comment={comments.address_comment[formType]} />

    <!-- Subscription Start Details -->
    <FormFieldset
      f_id="sub_start test"
      f_legend="When would you like the subscription to start?"
      inputs={inputs.start_inputs}
      comment={comments.start_comment[formType]}
      {gift} />

    <!-- Donation Toggle -->
    {#if formType === 'patron'}
      <FormFieldset
        f_id="patron_set_amount"
        f_legend="How much would you like to give?">
        <label for="patron_amount">
          <span class="label-title">Amount in Euro – Minimum €100</span>
          <input
            type="number"
            name="patron_amount"
            id="patron_amount"
            min="100"
            value="100" />
        </label>
      </FormFieldset>
      <FormFieldset
        f_id="patron_listed_toggle"
        f_legend="Would you like to be listed as a patron on our website?">
        <input
          type="radio"
          name="listed"
          id="listed_yes"
          value="true"
          checked />
        <label for="listed_yes">Yes, List My Name</label>
        <input type="radio" name="listed" id="listed_no" value="false" />
        <label for="listed_no">No, Don't List My Name</label>
      </FormFieldset>
    {/if}

    <!-- Payment Details -->
    <StripeElement
      on:formSubmit={handleFormSubmit}
      on:success={handleFormSuccess}
      on:failure={handleFormFailure}
      subscription={formType} />
  </form>

  {#if closed}
    <Spinner />
  {/if}

  {#if modal.display}
    <div class="modal" transition:fade>
      <div class="modal__underlay" on:click={() => (modal.display = false)} />
      <div class="modal__text">
        <h2>{modal.data.title}</h2>
        <p>{modal.data.message}</p>
        <a
          href={modal.data.link}
          on:click={() => (modal.display = false)}>{modal.data.button_text}</a>
      </div>
    </div>
  {/if}
{/if}
