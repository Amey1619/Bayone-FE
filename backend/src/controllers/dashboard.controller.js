export const getDashboardData = async (req, res) => {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; 
  const TIMEOUT = 5000; // 10 seconds

  const fetchWithRetry = async (url, options, retries = MAX_RETRIES) => {
    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          return await response.json();
        }

        if (response.status >= 400 && response.status < 500) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }

        if (i < retries - 1) {
          const delay = RETRY_DELAY * Math.pow(2, i);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }

        throw new Error(`API request failed after ${retries} attempts`);
      } catch (error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        
        if (i === retries - 1) {
          throw error;
        }

        const delay = RETRY_DELAY * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  try {
    const posts = await fetchWithRetry(process.env.DUMMY_URL, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      posts
    });
  } catch (error) {
    console.error('Dashboard API Error:', {
      message: error.message,
      timestamp: new Date().toISOString(),
      user: req.user?.id
    });

    res.status(503).json({
      success: false,
      message: "Service temporarily unavailable. Please try again later.",
      posts: [],
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};