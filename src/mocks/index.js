async function inject() {
	const { worker } = await import('./browser.js');
	// For live development, I disabled all warnings
	// for requests that are not mocked. Change how
	// you think it best fits your project.
	return worker.start()
}

inject(); 
