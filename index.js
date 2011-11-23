var email = require('mailer');
var exec = require('child_process').exec;
var config = require('./config');

var pdOpts = config.pagerduty;
var auth = "--basic --user '"+pdOpts.email+":"+pdOpts.password+"'";
var url = "https://"+pdOpts.domain+".pagerduty.com/api/v1/schedules/"+pdOpts.scheduleId+"/entries";
var cmd = "curl "+auth+" '"+url+"?since="+pdOpts.since+"&until="+pdOpts.until+"'";

exec(cmd, function(error, stdout, stderr){
  var data = JSON.parse(stdout);
  var out = [];
  for (var entry in data.entries) {
    entry = data.entries[entry];
    out.push(entry.user.name + ': From ' + entry.start + ' to ' + entry.end);
  }
  sendEmails(out.join("\n"));
});

function sendEmails(content) {
  var j = 0;
  for (var i = 0; i < config.email.sendTo.length; i++) {
    email.send({
      host           : config.smtp.host,
      port           : config.smtp.port,
      ssl            : true,
      domain         : config.smtp.domain,
      to             : config.email.sendTo[i],
      from           : config.email.from,
      subject        : config.email.subject,
      body           : content,
      authentication : 'login',
      username       : config.smtp.username,
      password       : config.smtp.password
    },
    function(err, result) {
      if (err) throw err;
      j++;

      if (j == config.email.sendTo.length) {
        console.warn('DONE');
        process.exit(0);
      }
    });
  }
}