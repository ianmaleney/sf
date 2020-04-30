<section>
<h2>Update Your Card Details</h2>
<div class="account-page__form-wrapper">
<form action="" method="post" class="account-page__form" id="update-card">
	<div id="card-element" style="background-color: #F9F9F9;padding: 12px 5px;border-radius: 4px;margin-right: 12px;margin-top: 5px;"></div>
	<p class="stripe-info" style="font-family: 'IBM Plex Sans Condensed'; font-size: 1.2rem; line-height: 1.2;">We use Stripe to securely handle all our payments. The Stinging Fly will never process or store your card details.</p>
	<div id="card-errors" style="margin: 15px; font-family: 'IBM Plex Sans Condensed';"></div>
	<div class="account-page__button">
		<button <?php if (!$stripe_customer_id) echo "disabled"; ?>>Submit</button>
	</div>
</form>
</div>
</section>