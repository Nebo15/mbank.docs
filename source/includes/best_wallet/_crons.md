#CRON таски для прода

|  Описание                               
| ---------------------------------------------------------------------------------------------------------------|
| 0 3 * * * /www/mbank.api/vendor/bin/pake -f /www/mbank.api/pakefile.php wallet_intersecting_contacts |
| 45 12 * * * /www/mbank.api/vendor/bin/pake -f /www/mbank.api/pakefile.php apns_feedback|
| * * * * * /www/mbank.api/vendor/bin/drunken do --config="/www/mbank.api/drunken.config.php" |
| 30 10-21 * * * /www/mbank.api/vendor/bin/pake -f /www/mbank.api/pakefile.php sync_mserver_services |
| 10 * * * * /www/mbank.api/vendor/bin/pake -f /www/mbank.api/pakefile.php aggregate_services_statistics |
| 2 * * * * /bin/bash /www/mbank.api/bin/image-optim.sh |
| 0 12 * * * /www/mbank.api/vendor/bin/pake -f /www/mbank.api/pakefile.php send_daily_transaction_log |
| 0 13 1 * * /www/mbank.api/vendor/bin/pake -f /www/mbank.api/pakefile.php send_monthly_transaction_log |
