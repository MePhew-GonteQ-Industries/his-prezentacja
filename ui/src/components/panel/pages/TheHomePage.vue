<script setup lang="ts">
import { NButton, NEllipsis, NScrollbar, NCode } from "naive-ui";
import { ref } from "vue";
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('python', python);

const exampleCode = `
def get_user(
    request: Request,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
    user_agent: str | None = Header(None),
) -> UserSession:
    payload = decode_jwt(token, expected_token_type=TokenType.access_token)
    user = db.query(models.User).where(models.User.id == payload.user_id).first()

    if not user:
        raise UserNotFoundException()

    sessions_db = (
        db.query(models.Session).where(models.Session.user_id == user.id).all()
    )

    session_db = None

    for session in sessions_db:
        if compare_digest(session.access_token, token):
            session_db = session
            break

    if not session_db:
        raise SessionNotFoundHTTPException()

    session_db.last_accessed = datetime.utcnow()
    session_db.last_user_agent = user_agent
    session_db.last_ip_address = request.client.host
    db.commit()

    if user.disabled:
        raise AccountDisabledHTTPException()

    user_session = UserSession(user=user, session=session_db)

    return user_session
`;

const counterProcedureTime = ref(0);

const procedureTime = ref("00:00:00");

const changeProcedureTime = () => {
  counterProcedureTime.value++;
  let hour, min, sec;
  if (Math.floor(counterProcedureTime.value / 3600) < 10) {
    hour = `0${Math.floor(counterProcedureTime.value / 3600)}`;
  } else {
    hour = Math.floor(counterProcedureTime.value / 3600);
  }
  if (Math.floor(counterProcedureTime.value / 60) < 10) {
    min = `0${Math.floor(counterProcedureTime.value / 60)}`;
  } else {
    min = Math.floor(counterProcedureTime.value / 60);
  }
  if (counterProcedureTime.value % 60 < 10) {
    sec = `0${counterProcedureTime.value % 60}`;
  } else {
    sec = counterProcedureTime.value % 60;
  }
  procedureTime.value = (`${hour}:${min}:${sec}`);
};

setInterval(changeProcedureTime, 1000);
</script>

<template>
  <div class="home-page">
    <div class="procedures">
      <div class="procedure">
        <svg class="procedure-icon" width="16" height="16" viewBox="0 0 24 25" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.1775 18.5997C20.8787 19.1489 21.903 19.03 22.3533 18.2617C23.2215 16.78 23.7649 15.1236 23.939 13.4026C24.1675 11.1447 23.751 8.86822 22.7378 6.83745C21.7247 4.80668 20.1564 3.10485 18.2151 1.92943C16.7354 1.03355 15.0852 0.471494 13.3793 0.274064C12.4946 0.171688 11.7836 0.918639 11.8007 1.80906C11.8177 2.69953 12.5591 3.39245 13.4377 3.5384C14.5322 3.72017 15.5872 4.10872 16.5446 4.68839C17.9642 5.54789 19.111 6.79232 19.8518 8.27732C20.5927 9.76227 20.8972 11.4269 20.7302 13.078C20.6175 14.1915 20.2934 15.2681 19.7805 16.2518C19.3687 17.0415 19.4764 18.0506 20.1775 18.5997Z"
            fill="white" />
          <path
            d="M8.07943 2.5751C7.74327 1.75035 6.795 1.3452 6.02272 1.7888C5.0444 2.35082 4.14785 3.04935 3.36104 3.86543C2.20011 5.06962 1.30374 6.50318 0.72946 8.07415C0.155177 9.64516 -0.084346 11.3188 0.0262705 12.9878C0.136907 14.6568 0.595202 16.2843 1.3718 17.7657C2.14839 19.2471 3.22611 20.5499 4.53581 21.5903C5.84551 22.6307 7.35825 23.3859 8.97695 23.8073C10.5957 24.2286 12.2846 24.307 13.9354 24.0372C15.0541 23.8544 16.1386 23.5144 17.1574 23.0295C17.9616 22.6468 18.1678 21.6364 17.6807 20.8907C17.1936 20.1451 16.1975 19.9513 15.3755 20.2938C14.7477 20.5554 14.09 20.7439 13.4152 20.8542C12.2081 21.0514 10.9731 20.9941 9.78948 20.686C8.60582 20.3779 7.49967 19.8257 6.54197 19.0649C5.58428 18.3041 4.79623 17.3515 4.22836 16.2683C3.66048 15.185 3.32536 13.995 3.24447 12.7745C3.16357 11.5541 3.33872 10.3303 3.75865 9.18149C4.17859 8.03277 4.83403 6.9845 5.68295 6.10397C6.1575 5.61173 6.68664 5.17802 7.25891 4.81054C8.00832 4.32934 8.41557 3.39985 8.07943 2.5751Z"
            fill="white" />
          <path
            d="M12.3332 15.5273C14.3582 15.5273 15.9999 13.8857 15.9999 11.8607C15.9999 9.83563 14.3582 8.19398 12.3332 8.19398C10.3081 8.19398 8.66649 9.83563 8.66649 11.8607C8.66649 13.8857 10.3081 15.5273 12.3332 15.5273Z"
            fill="white" />
        </svg>
        <n-ellipsis class="procedure-name" :line-clamp="2" :tooltip="false">
          Deport & burn
        </n-ellipsis>
      </div>
      <div class="procedure current">
        <svg class="procedure-icon" width="16" height="16" viewBox="0 0 24 25" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.1775 18.5997C20.8787 19.1489 21.903 19.03 22.3533 18.2617C23.2215 16.78 23.7649 15.1236 23.939 13.4026C24.1675 11.1447 23.751 8.86822 22.7378 6.83745C21.7247 4.80668 20.1564 3.10485 18.2151 1.92943C16.7354 1.03355 15.0852 0.471494 13.3793 0.274064C12.4946 0.171688 11.7836 0.918639 11.8007 1.80906C11.8177 2.69953 12.5591 3.39245 13.4377 3.5384C14.5322 3.72017 15.5872 4.10872 16.5446 4.68839C17.9642 5.54789 19.111 6.79232 19.8518 8.27732C20.5927 9.76227 20.8972 11.4269 20.7302 13.078C20.6175 14.1915 20.2934 15.2681 19.7805 16.2518C19.3687 17.0415 19.4764 18.0506 20.1775 18.5997Z"
            fill="white" />
          <path
            d="M8.07943 2.5751C7.74327 1.75035 6.795 1.3452 6.02272 1.7888C5.0444 2.35082 4.14785 3.04935 3.36104 3.86543C2.20011 5.06962 1.30374 6.50318 0.72946 8.07415C0.155177 9.64516 -0.084346 11.3188 0.0262705 12.9878C0.136907 14.6568 0.595202 16.2843 1.3718 17.7657C2.14839 19.2471 3.22611 20.5499 4.53581 21.5903C5.84551 22.6307 7.35825 23.3859 8.97695 23.8073C10.5957 24.2286 12.2846 24.307 13.9354 24.0372C15.0541 23.8544 16.1386 23.5144 17.1574 23.0295C17.9616 22.6468 18.1678 21.6364 17.6807 20.8907C17.1936 20.1451 16.1975 19.9513 15.3755 20.2938C14.7477 20.5554 14.09 20.7439 13.4152 20.8542C12.2081 21.0514 10.9731 20.9941 9.78948 20.686C8.60582 20.3779 7.49967 19.8257 6.54197 19.0649C5.58428 18.3041 4.79623 17.3515 4.22836 16.2683C3.66048 15.185 3.32536 13.995 3.24447 12.7745C3.16357 11.5541 3.33872 10.3303 3.75865 9.18149C4.17859 8.03277 4.83403 6.9845 5.68295 6.10397C6.1575 5.61173 6.68664 5.17802 7.25891 4.81054C8.00832 4.32934 8.41557 3.39985 8.07943 2.5751Z"
            fill="white" />
          <path
            d="M12.3332 15.5273C14.3582 15.5273 15.9999 13.8857 15.9999 11.8607C15.9999 9.83563 14.3582 8.19398 12.3332 8.19398C10.3081 8.19398 8.66649 9.83563 8.66649 11.8607C8.66649 13.8857 10.3081 15.5273 12.3332 15.5273Z"
            fill="white" />
        </svg>
        <n-ellipsis class="procedure-name" :line-clamp="2" :tooltip="false">
          Coast to Trunk Jettison
        </n-ellipsis>
      </div>
      <div class="procedure">
        <svg class="procedure-icon" width="16" height="16" viewBox="0 0 24 25" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.1775 18.5997C20.8787 19.1489 21.903 19.03 22.3533 18.2617C23.2215 16.78 23.7649 15.1236 23.939 13.4026C24.1675 11.1447 23.751 8.86822 22.7378 6.83745C21.7247 4.80668 20.1564 3.10485 18.2151 1.92943C16.7354 1.03355 15.0852 0.471494 13.3793 0.274064C12.4946 0.171688 11.7836 0.918639 11.8007 1.80906C11.8177 2.69953 12.5591 3.39245 13.4377 3.5384C14.5322 3.72017 15.5872 4.10872 16.5446 4.68839C17.9642 5.54789 19.111 6.79232 19.8518 8.27732C20.5927 9.76227 20.8972 11.4269 20.7302 13.078C20.6175 14.1915 20.2934 15.2681 19.7805 16.2518C19.3687 17.0415 19.4764 18.0506 20.1775 18.5997Z"
            fill="white" />
          <path
            d="M8.07943 2.5751C7.74327 1.75035 6.795 1.3452 6.02272 1.7888C5.0444 2.35082 4.14785 3.04935 3.36104 3.86543C2.20011 5.06962 1.30374 6.50318 0.72946 8.07415C0.155177 9.64516 -0.084346 11.3188 0.0262705 12.9878C0.136907 14.6568 0.595202 16.2843 1.3718 17.7657C2.14839 19.2471 3.22611 20.5499 4.53581 21.5903C5.84551 22.6307 7.35825 23.3859 8.97695 23.8073C10.5957 24.2286 12.2846 24.307 13.9354 24.0372C15.0541 23.8544 16.1386 23.5144 17.1574 23.0295C17.9616 22.6468 18.1678 21.6364 17.6807 20.8907C17.1936 20.1451 16.1975 19.9513 15.3755 20.2938C14.7477 20.5554 14.09 20.7439 13.4152 20.8542C12.2081 21.0514 10.9731 20.9941 9.78948 20.686C8.60582 20.3779 7.49967 19.8257 6.54197 19.0649C5.58428 18.3041 4.79623 17.3515 4.22836 16.2683C3.66048 15.185 3.32536 13.995 3.24447 12.7745C3.16357 11.5541 3.33872 10.3303 3.75865 9.18149C4.17859 8.03277 4.83403 6.9845 5.68295 6.10397C6.1575 5.61173 6.68664 5.17802 7.25891 4.81054C8.00832 4.32934 8.41557 3.39985 8.07943 2.5751Z"
            fill="white" />
          <path
            d="M12.3332 15.5273C14.3582 15.5273 15.9999 13.8857 15.9999 11.8607C15.9999 9.83563 14.3582 8.19398 12.3332 8.19398C10.3081 8.19398 8.66649 9.83563 8.66649 11.8607C8.66649 13.8857 10.3081 15.5273 12.3332 15.5273Z"
            fill="white" />
        </svg>
        <n-ellipsis class="procedure-name" :line-clamp="2" :tooltip="false">
          Claw Seperation
        </n-ellipsis>
      </div>
      <div class="procedure">
        <svg class="procedure-icon" width="16" height="16" viewBox="0 0 24 25" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.1775 18.5997C20.8787 19.1489 21.903 19.03 22.3533 18.2617C23.2215 16.78 23.7649 15.1236 23.939 13.4026C24.1675 11.1447 23.751 8.86822 22.7378 6.83745C21.7247 4.80668 20.1564 3.10485 18.2151 1.92943C16.7354 1.03355 15.0852 0.471494 13.3793 0.274064C12.4946 0.171688 11.7836 0.918639 11.8007 1.80906C11.8177 2.69953 12.5591 3.39245 13.4377 3.5384C14.5322 3.72017 15.5872 4.10872 16.5446 4.68839C17.9642 5.54789 19.111 6.79232 19.8518 8.27732C20.5927 9.76227 20.8972 11.4269 20.7302 13.078C20.6175 14.1915 20.2934 15.2681 19.7805 16.2518C19.3687 17.0415 19.4764 18.0506 20.1775 18.5997Z"
            fill="white" />
          <path
            d="M8.07943 2.5751C7.74327 1.75035 6.795 1.3452 6.02272 1.7888C5.0444 2.35082 4.14785 3.04935 3.36104 3.86543C2.20011 5.06962 1.30374 6.50318 0.72946 8.07415C0.155177 9.64516 -0.084346 11.3188 0.0262705 12.9878C0.136907 14.6568 0.595202 16.2843 1.3718 17.7657C2.14839 19.2471 3.22611 20.5499 4.53581 21.5903C5.84551 22.6307 7.35825 23.3859 8.97695 23.8073C10.5957 24.2286 12.2846 24.307 13.9354 24.0372C15.0541 23.8544 16.1386 23.5144 17.1574 23.0295C17.9616 22.6468 18.1678 21.6364 17.6807 20.8907C17.1936 20.1451 16.1975 19.9513 15.3755 20.2938C14.7477 20.5554 14.09 20.7439 13.4152 20.8542C12.2081 21.0514 10.9731 20.9941 9.78948 20.686C8.60582 20.3779 7.49967 19.8257 6.54197 19.0649C5.58428 18.3041 4.79623 17.3515 4.22836 16.2683C3.66048 15.185 3.32536 13.995 3.24447 12.7745C3.16357 11.5541 3.33872 10.3303 3.75865 9.18149C4.17859 8.03277 4.83403 6.9845 5.68295 6.10397C6.1575 5.61173 6.68664 5.17802 7.25891 4.81054C8.00832 4.32934 8.41557 3.39985 8.07943 2.5751Z"
            fill="white" />
          <path
            d="M12.3332 15.5273C14.3582 15.5273 15.9999 13.8857 15.9999 11.8607C15.9999 9.83563 14.3582 8.19398 12.3332 8.19398C10.3081 8.19398 8.66649 9.83563 8.66649 11.8607C8.66649 13.8857 10.3081 15.5273 12.3332 15.5273Z"
            fill="white" />
        </svg>
        <n-ellipsis class="procedure-name" :line-clamp="2" :tooltip="false">
          Procedure
        </n-ellipsis>
      </div>
      <div class="procedure">
        <svg class="procedure-icon" width="12" height="12" viewBox="0 0 24 25" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.1775 18.5997C20.8787 19.1489 21.903 19.03 22.3533 18.2617C23.2215 16.78 23.7649 15.1236 23.939 13.4026C24.1675 11.1447 23.751 8.86822 22.7378 6.83745C21.7247 4.80668 20.1564 3.10485 18.2151 1.92943C16.7354 1.03355 15.0852 0.471494 13.3793 0.274064C12.4946 0.171688 11.7836 0.918639 11.8007 1.80906C11.8177 2.69953 12.5591 3.39245 13.4377 3.5384C14.5322 3.72017 15.5872 4.10872 16.5446 4.68839C17.9642 5.54789 19.111 6.79232 19.8518 8.27732C20.5927 9.76227 20.8972 11.4269 20.7302 13.078C20.6175 14.1915 20.2934 15.2681 19.7805 16.2518C19.3687 17.0415 19.4764 18.0506 20.1775 18.5997Z"
            fill="white" />
          <path
            d="M8.07943 2.5751C7.74327 1.75035 6.795 1.3452 6.02272 1.7888C5.0444 2.35082 4.14785 3.04935 3.36104 3.86543C2.20011 5.06962 1.30374 6.50318 0.72946 8.07415C0.155177 9.64516 -0.084346 11.3188 0.0262705 12.9878C0.136907 14.6568 0.595202 16.2843 1.3718 17.7657C2.14839 19.2471 3.22611 20.5499 4.53581 21.5903C5.84551 22.6307 7.35825 23.3859 8.97695 23.8073C10.5957 24.2286 12.2846 24.307 13.9354 24.0372C15.0541 23.8544 16.1386 23.5144 17.1574 23.0295C17.9616 22.6468 18.1678 21.6364 17.6807 20.8907C17.1936 20.1451 16.1975 19.9513 15.3755 20.2938C14.7477 20.5554 14.09 20.7439 13.4152 20.8542C12.2081 21.0514 10.9731 20.9941 9.78948 20.686C8.60582 20.3779 7.49967 19.8257 6.54197 19.0649C5.58428 18.3041 4.79623 17.3515 4.22836 16.2683C3.66048 15.185 3.32536 13.995 3.24447 12.7745C3.16357 11.5541 3.33872 10.3303 3.75865 9.18149C4.17859 8.03277 4.83403 6.9845 5.68295 6.10397C6.1575 5.61173 6.68664 5.17802 7.25891 4.81054C8.00832 4.32934 8.41557 3.39985 8.07943 2.5751Z"
            fill="white" />
          <path
            d="M12.3332 15.5273C14.3582 15.5273 15.9999 13.8857 15.9999 11.8607C15.9999 9.83563 14.3582 8.19398 12.3332 8.19398C10.3081 8.19398 8.66649 9.83563 8.66649 11.8607C8.66649 13.8857 10.3081 15.5273 12.3332 15.5273Z"
            fill="white" />
        </svg>
        <n-ellipsis class="procedure-name" :line-clamp="2" :tooltip="false">
          Manual Chute Deployment
        </n-ellipsis>
      </div>
    </div>

    <div class="current-procedure">
      <div class="procedure-header">
        <div class="step-buttons">
          <NButton class="previous-step" ghost color="white">
            <svg width="16" height="16" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M32 14.2646H7.66L18.84 3.08465L16 0.264648L0 16.2646L16 32.2646L18.82 29.4446L7.66 18.2646H32V14.2646Z"
                fill="white" />
            </svg>
          </NButton>
          <NButton class="next-step" ghost color="white">
            <svg width="16" height="16" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.22392e-06 18.2646L24.34 18.2646L13.16 29.4446L16 32.2646L32 16.2646L16 0.264647L13.18 3.08465L24.34 14.2646L1.57361e-06 14.2646L1.22392e-06 18.2646Z"
                fill="white" />
            </svg>
          </NButton>
        </div>
        <h1 class="procedure-name">Coast to Trunk Jesttison</h1>
        <div class="procedure-state-container">
          <div class="title-container">
            <p class="procedure-state">running</p>
            <svg class="procedure-state-icon" width="17" height="23" viewBox="0 0 34 29" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.692 5.58057L18.5334 5.85505L18.2363 5.74428C13.9176 4.13372 8.92907 5.81881 6.54799 9.93822C3.89259 14.5322 5.47044 20.4326 10.0644 23.088C14.6585 25.7434 20.5588 24.1655 23.2142 19.5715L24.5727 17.2212L20.6974 18.2575L20.3352 18.3544L20.2383 17.9921L19.3773 14.7724L19.2804 14.4102L19.6427 14.3133L29.8892 11.5732L30.2515 11.4763L30.3484 11.8386L33.0885 22.0851L33.1854 22.4474L32.8231 22.5443L29.6034 23.4053L29.2411 23.5022L29.1443 23.1399L28.108 19.2646L26.7494 21.6149C24.93 24.7626 21.9347 27.0586 18.4225 27.9979C14.9102 28.9371 11.1687 28.4426 8.02102 26.6232C4.87334 24.8038 2.57733 21.8085 1.6381 18.2963C0.698861 14.784 1.19333 11.0425 3.01274 7.89479C6.51177 1.84124 13.9238 -0.5202 20.1982 2.13273L20.5893 2.29812L20.3768 2.66579L18.692 5.58057Z"
                fill="white" stroke="white" stroke-width="0.75" />
            </svg>
          </div>
          <p class="procedure-time">
            {{ procedureTime }}
          </p>
        </div>
      </div>
      <div class="procedure-steps">
        <NScrollbar>
          <div class="procedure-step">
            <div class="step-header">
              <svg width="18" height="19" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M30.2662 27.7672C31.3179 28.5909 32.8544 28.4126 33.5298 27.26C34.8321 25.0376 35.6472 22.553 35.9084 19.9715C36.2511 16.5846 35.6263 13.1699 34.1066 10.1238C32.5869 7.07766 30.2345 4.52493 27.3225 2.7618C25.1029 1.41799 22.6277 0.574915 20.0689 0.278772C18.7418 0.125208 17.6753 1.24563 17.7009 2.58126C17.7265 3.91696 18.8386 4.95632 20.1565 5.17526C21.7982 5.4479 23.3807 6.03073 24.8168 6.90023C26.9462 8.18948 28.6663 10.0561 29.7776 12.2836C30.8889 14.511 31.3457 17.0079 31.0951 19.4845C30.9261 21.1548 30.44 22.7697 29.6705 24.2453C29.0529 25.4298 29.2144 26.9434 30.2662 27.7672Z"
                  fill="#FFB74B" />
                <path
                  d="M12.1191 3.73031C11.6148 2.49319 10.1925 1.88546 9.03403 2.55087C7.56657 3.39388 6.22175 4.44168 5.04154 5.6658C3.30015 7.47207 1.9556 9.6224 1.09418 11.9788C0.232765 14.3354 -0.126518 16.8458 0.0394056 19.3493C0.20536 21.8528 0.892799 24.294 2.05769 26.5161C3.22257 28.7382 4.83915 30.6923 6.80369 32.253C8.76823 33.8136 11.0373 34.9463 13.4654 35.5784C15.8934 36.2105 18.4268 36.328 20.9029 35.9233C22.5811 35.6491 24.2078 35.1391 25.7359 34.4118C26.9422 33.8377 27.2515 32.3221 26.5209 31.2036C25.7904 30.0852 24.2962 29.7945 23.0631 30.3083C22.1214 30.7007 21.1349 30.9834 20.1227 31.1488C18.3121 31.4447 16.4596 31.3587 14.6842 30.8966C12.9087 30.4344 11.2495 29.6061 9.8129 28.4649C8.37638 27.3238 7.19431 25.8949 6.34251 24.27C5.4907 22.645 4.98801 20.86 4.86668 19.0294C4.74534 17.1988 5.00806 15.363 5.63795 13.6399C6.26786 11.9168 7.25101 10.3444 8.52439 9.02358C9.23621 8.28524 10.0299 7.63467 10.8883 7.08346C12.0124 6.36166 12.6233 4.96743 12.1191 3.73031Z"
                  fill="#FFB74B" />
                <path
                  d="M18.4997 23.1586C21.5372 23.1586 23.9997 20.6961 23.9997 17.6586C23.9997 14.6211 21.5372 12.1586 18.4997 12.1586C15.4621 12.1586 12.9997 14.6211 12.9997 17.6586C12.9997 20.6961 15.4621 23.1586 18.4997 23.1586Z"
                  fill="#FFB74B" />
              </svg>
              <p class="step-name">crew interrupt conditions</p>
            </div>
            <div class="step">
              <p class="name">30° sustained altitude error</p>
              <div class="divider"></div>
              <p class="value uppercase">far field pointing</p>
            </div>
            <div class="step">
              <p class="name">600°/m altitude rate</p>
              <div class="divider"></div>
              <p class="value uppercase">far field pointing</p>
            </div>
          </div>

          <div class="procedure-step">
            <div class="step-header">
              <svg width="18" height="19" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M30.2662 27.7672C31.3179 28.5909 32.8544 28.4126 33.5298 27.26C34.8321 25.0376 35.6472 22.553 35.9084 19.9715C36.2511 16.5846 35.6263 13.1699 34.1066 10.1238C32.5869 7.07766 30.2345 4.52493 27.3225 2.7618C25.1029 1.41799 22.6277 0.574915 20.0689 0.278772C18.7418 0.125208 17.6753 1.24563 17.7009 2.58126C17.7265 3.91696 18.8386 4.95632 20.1565 5.17526C21.7982 5.4479 23.3807 6.03073 24.8168 6.90023C26.9462 8.18948 28.6663 10.0561 29.7776 12.2836C30.8889 14.511 31.3457 17.0079 31.0951 19.4845C30.9261 21.1548 30.44 22.7697 29.6705 24.2453C29.0529 25.4298 29.2144 26.9434 30.2662 27.7672Z"
                  fill="#20FBFD" />
                <path
                  d="M12.1191 3.73031C11.6148 2.49319 10.1925 1.88546 9.03403 2.55087C7.56657 3.39388 6.22175 4.44168 5.04154 5.6658C3.30015 7.47207 1.9556 9.6224 1.09418 11.9788C0.232765 14.3354 -0.126518 16.8458 0.0394056 19.3493C0.20536 21.8528 0.892799 24.294 2.05769 26.5161C3.22257 28.7382 4.83915 30.6923 6.80369 32.253C8.76823 33.8136 11.0373 34.9463 13.4654 35.5784C15.8934 36.2105 18.4268 36.328 20.9029 35.9233C22.5811 35.6491 24.2078 35.1391 25.7359 34.4118C26.9422 33.8377 27.2515 32.3221 26.5209 31.2036C25.7904 30.0852 24.2962 29.7945 23.0631 30.3083C22.1214 30.7007 21.1349 30.9834 20.1227 31.1488C18.3121 31.4447 16.4596 31.3587 14.6842 30.8966C12.9087 30.4344 11.2495 29.6061 9.8129 28.4649C8.37638 27.3238 7.19431 25.8949 6.34251 24.27C5.4907 22.645 4.98801 20.86 4.86668 19.0294C4.74534 17.1988 5.00806 15.363 5.63795 13.6399C6.26786 11.9168 7.25101 10.3444 8.52439 9.02358C9.23621 8.28524 10.0299 7.63467 10.8883 7.08346C12.0124 6.36166 12.6233 4.96743 12.1191 3.73031Z"
                  fill="#20FBFD" />
                <path
                  d="M18.4997 23.1586C21.5372 23.1586 23.9997 20.6961 23.9997 17.6586C23.9997 14.6211 21.5372 12.1586 18.4997 12.1586C15.4621 12.1586 12.9997 14.6211 12.9997 17.6586C12.9997 20.6961 15.4621 23.1586 18.4997 23.1586Z"
                  fill="#20FBFD" />
              </svg>

              <p class="step-name">crew deorbit preparations</p>
            </div>
            <div class="step">
              <p class="name">Deorbit burn - 3hrs</p>
              <div class="divider"></div>
              <p class="value">On SpaceX, On, begin procedure 4.700</p>
            </div>
            <div class="step">
              <p class="name">NLT Deorbit Burn - 1hr</p>
              <div class="divider"></div>
              <p class="value">Deorbit burn brief</p>
            </div>
            <div class="step">
              <p class="name">NLT Deorbit Burn - 30min</p>
              <div class="divider"></div>
              <p class="value">Review Reference Content</p>
            </div>
            <div class="step">
              <p class="name">Deorbit, entry and landing Go/No-Go</p>
              <div class="divider"></div>
              <p class="value">Acknowledge</p>
            </div>
          </div>

          <div class="procedure-step">
            <ol>
              <li>
                <p>Monitor slow to free-flight altitude (Sun+GEO pointing)</p>
              </li>
              <li>
                <p>After SpaceX GO for deorbit, verify entry is enabled:</p>
                <div class="checklist-container">
                  <p class="checklist-item">entry enabled</p>
                  <p class="checklist-correct-value">true</p>
                  <p class="checklist-current-value">false</p>
                </div>
              </li>
              <li>
                <p>After entry is enabled, Dragon transitions to Claw</p>
              </li>
            </ol>
          </div>
        </NScrollbar>
      </div>
    </div>

    <div class="trajectory">
      <template v-if="true">
        <img class="globe" src="@/assets/globe.svg" alt="Globe">
        <div class="target-coordinates">
          <div class="coordinate">
            <p class="title">target latitude</p>
            <p class="value">26°15.00°N</p>
          </div>
          <div class="coordinate">
            <p class="title">target longitude</p>
            <p class="value">26°15.00°N</p>
          </div>
        </div>
        <div class="camera-mode">
          <p class="title">camera</p>
          <p class="mode">Auto - Earth IO</p>
          <NButton ghost color="white" round size="large" class="camera-settings-btn">settings
          </NButton>
        </div>
      </template>
      <template v-else>
        <NCode :code="exampleCode" language="python" show-line-numbers v-if="false" />
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.n-button.camera-settings-btn {
  background-color: #111B52;

  span {
    text-transform: uppercase;
    font-weight: bold;
  }
}
</style>

<style lang="scss">
.divider.n-divider--dashed .n-divider__line {
  border-color: white;
}

.n-scrollbar-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.n-scrollbar-rail__scrollbar {
  background-color: #5D68A4 !important;
}
</style>

<style scoped lang="scss">
.home-page {
  display: grid;
  grid-template-columns: 1fr 6fr 10fr;
  justify-items: center;
  height: 95%;

  .procedures {
    border-right: 1px solid #adb0c2;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .5rem 0;

    .procedure {
      width: 80%;
      display: flex;
      flex-direction: column;
      padding: .5rem;
      align-items: center;
      justify-content: center;
      gap: .5rem;
      cursor: pointer;
      border-radius: .375rem;

      &.current {
        border: 1px solid #adb0c2;
      }

      .procedure-name {
        font-weight: 500;
        text-align: center;
      }
    }
  }

  .current-procedure {
    border-right: 1px solid #adb0c2;
    width: 100%;
    display: grid;
    grid-template-rows: 13vh 70vh;

    @media (min-height: 900px) {
      grid-template-rows: 13vh 71vh;
    }

    .step-buttons {
      display: flex;
      gap: .5rem;

      .previous-step,
      .next-step {
        width: 50px;
        height: 50px;
        border-radius: .375rem;
        background-color: #111B52;
      }
    }

    .procedure-header {
      display: flex;
      align-items: center;
      padding: 1rem;

      .procedure-name {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 0 10% 0 5%;

        @media (min-width: 1920px) {
          font-size: 1.4rem;
        }
      }

      .procedure-state-container {
        display: flex;
        flex-direction: column;

        .title-container {
          display: flex;
          gap: .5rem;

          .procedure-state {
            text-transform: uppercase;
            font-weight: bold;
          }

          svg {
            cursor: pointer;
          }
        }
      }
    }

    .procedure-steps {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 0 1rem 1rem;

      .procedure-step {
        background-color: #111B52;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-right: 1rem;

        .step-header {
          display: flex;
          align-items: center;
          gap: .5rem;
          border-bottom: 1px solid white;
          padding: .5rem 0;

          .step-name {
            text-transform: capitalize;
            font-weight: bold;
          }
        }

        .step {
          display: flex;
          align-items: flex-end;
          width: 100%;

          .name {
            display: inline-flex;
          }

          .divider {
            border-bottom: 1px dashed white;
            display: inline-flex;
            flex-grow: 100;
            margin-bottom: 7px;
          }

          .value {
            display: inline-flex;
            font-weight: bold;
            text-transform: capitalize;

            &.uppercase {
              text-transform: uppercase;
            }
          }
        }

        ol {
          padding: 0 0 0 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;

          ::marker {
            font-weight: bold;
          }

          p {
            font-weight: bold;
          }

          li {
            .checklist-container {
              display: flex;
              border-width: 1px 0 1px 0;
              border-color: white;
              border-style: solid;
              margin-top: .5rem;
              padding: .5rem 15% .5rem 0;
              justify-content: space-between;

              .checklist-item {
                color: #C1C3DF;
                text-transform: uppercase;
              }

              .checklist-correct-value {
                color: #C1C3DF;
                text-transform: capitalize;
              }

              .checklist-current-value {
                text-transform: capitalize;
              }
            }
          }
        }
      }
    }
  }

  .trajectory {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    .globe {
      width: 55%;
    }

    .target-coordinates {
      display: flex;
      gap: 1rem;

      .coordinate {
        p {
          text-transform: uppercase;
          font-weight: bold;
        }
      }
    }

    .camera-mode {
      position: absolute;
      bottom: 5%;
      right: 5%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: .5rem;

      p {
        font-weight: bold;
        text-align: center;
      }

      .title {
        text-transform: uppercase;
      }
    }
  }
}
</style>
