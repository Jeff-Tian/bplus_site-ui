#!/bin/sh

PORT="12000"
APP_NAME="bplus"

################################
#     START PM2 INSTANCE	   #
################################
if [ -n "$PORT" ]; then
	echo "Listening on port: $PORT"
	export PORT
fi

CURRENT_PATH=`dirname $0`
pm2 start "$CURRENT_PATH/../server.js" --name "$APP_NAME"
exit $?