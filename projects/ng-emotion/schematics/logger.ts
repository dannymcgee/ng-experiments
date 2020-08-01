import chalk from 'chalk-pipe';

type Chalk = typeof chalk;
type LogSeverity = 'success'|'info'|'warning'|'error';
type Theme = { [key in LogSeverity]: Chalk };

const THEME: Theme = {
	success: chalk('cyanBright.bold'),
	info: chalk('blueBright.bold'),
	warning: chalk('yellowBright.bold'),
	error: chalk('redBright.bold'),
};

type LogOperator = () => void;

// tslint:disable: no-console

export function Log (...fns: LogOperator[]): void {
	brk();
	fns.forEach((fn) => fn());
	brk();
}

export function brk (): void {
	console.log('');
}

export function success (message: any, label: string = 'Success'): LogOperator {
	return _log(message, label, 'success');
}

export function info (message: any, label: string = 'Info'): LogOperator {
	return _log(message, label, 'info');
}

export function warning (message: any, label: string = 'Warning'): LogOperator {
	return _log(message, label, 'warning');
}

export function error (message: any, label: string = 'Error'): LogOperator {
	return _log(message, label, 'error');
}

function _log (message: any, label: string, severity: LogSeverity): LogOperator {
	const style = THEME[severity];
	const text = style(label + ': ');

	return () => console.log(text, message);
}
