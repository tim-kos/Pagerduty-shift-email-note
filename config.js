var today = new Date();
var tmrw = new Date();
tmrw.setTime(tmrw.getTime() + (1000 * 3600 * 24));

var config = {
  pagerduty: {
    email: 'your_pagerduty_email',
    password: 'your_pagerduty_password',
    domain: 'your_pagerduty_subdomain',
    scheduleId: 'your schedule id, for example P239SN2',

    // include data from X until Y, needs to be YYYY-MM-DD
    since: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
    until: tmrw.getFullYear() + '-' + (tmrw.getMonth() + 1) + '-' + tmrw.getDate()
  },
  email: {
    subject: 'Pagerduty shift for today',
    from: 'sample@example.org',
    sendTo: [
      'test@example.org',
    ],
  },
  smtp: {
    host: '', // smtp host, for example smtp.gmail.com
    port: 465,
    domain: 'localhost',
    username: '',
    password: ''
  }
};
module.exports = config;