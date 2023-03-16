<script setup lang="ts">
import { NCode } from 'naive-ui';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('python', python);

const exampleCode = `def send_upcoming_appointment_notification(
    get_db_func: callable,
    *,
    user_id: UUID4,
    appointment_id: UUID4,
    minutes_to_appointment: int,
):
    db = next(get_db_func())

    upcoming_appointment_notification = UpcomingAppointmentNotification(
        db=db,
        user_id=user_id,
        appointment_id=appointment_id,
        minutes_to_appointment=minutes_to_appointment,
    )
    upcoming_appointment_notification.send()`;
</script>


<template>
    <NCode :code="exampleCode" language="python" show-line-numbers class="code slide" />
</template>

<style scoped>
.code {
    font-size: 1.2rem;
}
</style>
