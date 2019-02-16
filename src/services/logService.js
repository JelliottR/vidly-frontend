import * as Sentry from '@sentry/browser';

function init() {
	Sentry.init({
		dsn: 'https://633185416717442db663e295ba6bf16d@sentry.io/1380363'
	});
}

function log(error) {
	Sentry.captureException(error);
}

export default {
	init,
	log
};
