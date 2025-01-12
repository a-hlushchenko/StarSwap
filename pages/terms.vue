<script setup lang="ts">
import { useWebAppBackButton, useWebAppHapticFeedback } from "vue-tg";

const { showBackButton, hideBackButton } = useWebAppBackButton();

onMounted(() => {
  showBackButton();
});
onUnmounted(() => {
  hideBackButton();
});
</script>
<template>
  <GeneralContainer>
    <GeneralFlex column>
      <GeneralTitle>User Agreement</GeneralTitle>
      <GeneralText>
        This User Agreement (hereinafter referred to as the "Agreement") governs
        the terms and conditions of using the Mini App (hereinafter referred to
        as the "Application") provided by StarSwap. By using the Application,
        you confirm that you have read, understood, and agree to the terms of
        this Agreement.
      </GeneralText>

      <GeneralTitle>1. General Provisions</GeneralTitle>
      <GeneralText>
        <GeneralTitle mini>1.1.</GeneralTitle>
        The Application allows users to exchange Telegram Stars for USDT on the
        TON blockchain, with the funds sent to a wallet connected through TON
        Connect.
      </GeneralText>
      <GeneralText>
        <GeneralTitle mini>1.2.</GeneralTitle>
        The use of the Application is available only to individuals who have
        reached the age of majority in accordance with the laws of their country
        of residence.</GeneralText
      >
      <GeneralText>
        <GeneralTitle mini>1.3.</GeneralTitle>
        Users are required to comply with all applicable laws and regulations
        when using the Application.
      </GeneralText>

      <GeneralTitle>2. Registration and Access</GeneralTitle>
      <GeneralText>
        <GeneralTitle mini>2.1.</GeneralTitle>
        To use the Application, users must connect their TON wallet through TON
        Connect.
      </GeneralText>
      <GeneralText>
        <GeneralTitle mini>2.2.</GeneralTitle>
        Users are responsible for maintaining the confidentiality of their
        wallet information and access credentials.
      </GeneralText>

      <GeneralTitle>3. Exchange Terms</GeneralTitle>
      <GeneralText>
        <GeneralTitle mini>3.1.</GeneralTitle>
        Users initiate the exchange of Telegram Stars for USDT voluntarily,
        accepting all risks associated with the operation.
      </GeneralText>
      <GeneralText>
        <GeneralTitle mini>3.2.</GeneralTitle>
        The exchange is carried out at the current rate displayed in the
        Application at the time of the transaction.
      </GeneralText>
      <GeneralText>
        <GeneralTitle mini>3.3.</GeneralTitle>
        StarSwap reserves the right to change the exchange rate at any time
        without prior notice to users.
      </GeneralText>
      <GeneralText>
        <GeneralTitle mini>3.4.</GeneralTitle>
        All transactions are final and non-reversible after confirmation.
      </GeneralText>
      <GeneralText>
        <GeneralTitle mini>3.5.</GeneralTitle>
        USDT is transferred exclusively to the wallet connected by the user
        through TON Connect.
      </GeneralText>

      <GeneralTitle>4. Disclaimer of Liability</GeneralTitle>
      <GeneralText>
        <GeneralTitle mini>4.1.</GeneralTitle>
        StarSwap is not responsible for errors made by users, including
        incorrect wallet addresses or connection errors.
      </GeneralText>
      <GeneralText>
        <GeneralTitle mini>4.2.</GeneralTitle>
        Users assume all risks associated with the use of third-party software
        (e.g., TON Connect or wallets).
      </GeneralText>
      <GeneralText>
        <GeneralTitle mini>4.3.</GeneralTitle>
        StarSwap does not guarantee uninterrupted operation of the Application
        and is not liable for losses resulting from technical failures or force
        majeure events.
      </GeneralText>

      <GeneralTitle>5. Refund Policy</GeneralTitle>
      <GeneralText>
        <GeneralTitle mini>5.1.</GeneralTitle>
        All transactions made through the Application are final and irrevocable.
      </GeneralText>
      <GeneralText>
        <GeneralTitle mini>5.2.</GeneralTitle>
        No refunds will be issued under any circumstances, including user
        errors, technical issues, or dissatisfaction with the service.
      </GeneralText>

      <GeneralTitle>6. Prohibited Activities</GeneralTitle>
      <GeneralText>
        <GeneralTitle mini>6.1.</GeneralTitle>
        Users are prohibited from:<br />- Using the Application for illegal
        activities, including money laundering and terrorism financing.<br />-
        Providing false information or attempting to bypass the Application's
        restrictions.
      </GeneralText>

      <GeneralTitle>7. Privacy Policy</GeneralTitle>
      <GeneralText>
        <GeneralTitle mini>7.1.</GeneralTitle>
        The Application collects only the minimum data necessary to process
        transactions.
      </GeneralText>
      <GeneralText>
        <GeneralTitle mini>7.2.</GeneralTitle>
        StarSwap does not share user data with third parties, except as required
        by law.
      </GeneralText>

      <GeneralTitle>8. Changes and Termination</GeneralTitle>
      <GeneralText>
        <GeneralTitle mini>8.1.</GeneralTitle>
        StarSwap reserves the right to amend this Agreement at any time. Changes
        take effect upon publication in the Application.
      </GeneralText>
      <GeneralText>
        <GeneralTitle mini>8.2.</GeneralTitle>
        Users may stop using the Application at any time by disconnecting their
        wallet.
      </GeneralText>

      <GeneralTitle>9. Miscellaneous</GeneralTitle>
      <GeneralText>
        <GeneralTitle mini>9.1.</GeneralTitle>
        This Agreement is governed by the applicable laws of the user’s
        jurisdiction.
      </GeneralText>
      <GeneralText>
        <GeneralTitle mini>9.2.</GeneralTitle>
        Any disputes arising from the use of the Application shall be resolved
        in accordance with the applicable laws of the user’s jurisdiction.
      </GeneralText>

      <GeneralTitle mini
        >By using the Application, you agree to the terms and conditions of this
        Agreement.</GeneralTitle
      >
    </GeneralFlex>
  </GeneralContainer>
</template>
