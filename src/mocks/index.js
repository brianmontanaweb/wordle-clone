async function inject() {
	const { server } = await import('./server.js');
	// For live development, I disabled all warnings
	// for requests that are not mocked. Change how
	// you think it best fits your project.
	return server.listen({ onUnhandledRequest: 'bypass' });
}

inject();
