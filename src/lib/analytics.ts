// Analytics Event Constants for Product Hunt style platform
export const GA_EVENTS = {
    // Core Interactions
    UPVOTE: 'upvote',
    REMOVE_UPVOTE: 'remove_upvote',
    VISIT_WEBSITE: 'visit_website', // Very important for Outbound clicks
    
    // Content Generation
    LAUNCH_PRODUCT: 'launch_product',
    ADD_COMMENT: 'add_comment',
    
    // User Management
    SIGN_UP: 'sign_up',
    LOGIN: 'login',
    
    // Discovery
    SEARCH: 'search',
} as const;

/**
 * Type safe Google Analytics Event Tracker helper
 * @param eventName The standard GA_EVENTS string
 * @param params Optional object containing custom dimensions like product_id, category etc.
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
    // Ensure we are only running this on the client side
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, params);
    } else {
        // Fallback for development if gtag is not ready, or running in SSR
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics Analytics] ${eventName}`, params);
        }
    }
};

// Next.js gtag type definitions for window object
declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'js' | 'consent',
            targetId: string,
            config?: Record<string, any>
        ) => void;
    }
}
