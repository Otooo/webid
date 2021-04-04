
export function isSignedIn() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');

    if (! (token && expiration)) // If dont exists token or expiration date in LocalStorage
        return false; // user not assign 
  
    const now = Date.now();
    const isExpired = (now - 1000) > expiration;
    
    return !isExpired;
}

export function headers() {
    return {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
    };
}
