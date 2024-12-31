// import { fetchUserBets, fetchUserBetsOptions } from "./data/getData";
import { OptionFormData } from "./types";

// Logic: From here, call API route, which runs a function using the modules in lib/data.

export async function fetchUserBalance(userString: string) {
    try {
        const response = await fetch(`/api/user?username=${encodeURIComponent(userString)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) throw new Error('Failed to fetch balance');
        const data = await response.json();
        if(!data.balance) {
            return 0;
        } else {
            return data.balance;
        }
        
    } catch (error) {
        console.error('Error fetching balance', error);
    }
}

export async function fetchUserBetsAPI(username: string) {
    try {
        const response = await fetch(`/api/get-user-bets?username=${encodeURIComponent(username)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (!response.ok) throw new Error('Failed to fetch user bets and stuff');
        const data = await response.json();
        if(!data) {
            return 0;
        } else {
            return data;
        }
    } catch (error) {
        console.error('Error fetching the bets of the user: ', error)
    }
}

export async function fetchUserOptionsAPI(username: string) {
    try {
        const response = await fetch(`/api/get-user-options?username=${encodeURIComponent(username)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },        
        })
        if (!response.ok) throw new Error('Failed to fetch user options');
        const data = await response.json();
        if(data.options) {
            return data.options
        } else {
            return []
        }
    } catch (error) {
        console.error('Error fetching users options: ', error)
    }
}

export async function handleResolveOption(username: string, optionid: string, outcome: 'o' | 'u' | 'h' | 'm') {
    const secretkey = 'nigga'
    try {
        const response = await fetch(`/api/resolve-bet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, optionid, outcome, secretkey})
        })
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Resolution failed: ${data}`);
        }
        return { success: true, message: 'Resolution successful' }
    } catch (error) {
        console.error('Error in resolve option handler: ', error)
        return { success: false, message: error }
    }
}

export async function handleResolvePTWOption(username: string, optionid: string, outcome: number) {
    const secretkey = 'nigga'
    try {
        const response = await fetch(`/api/resolve-ptw-bet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, optionid, outcome, secretkey})
        })
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Resolution failed: ${data}`);
        }
        return { success: true, message: 'Resolution successful' }
    } catch (error) {
        console.error('Error in resolve PTW option handler: ', error)
        return { success: false, message: error }
    }
}

export async function handleLogin(username: string, password: string) { // do this when u implement password
    //const { username, password } = await request.json();

    // RE STRUCTURE LIKE HANDLE REGISTER
    try {
        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (!response.ok) {
            // If the response is not ok, throw an error with the status text
            //const errorText = await response.json().t
            throw new Error(`Login failed: ${data}`);
        }
        if(response.status === 401) {
            return { success: false, message: 'Invalid username or password' }
        } else if (response.status === 200) {
            return { success: true, data, message: 'Login successful' }
        } else {
            return { success: false, message: 'Unknown Error'} 
        }

    } catch (error) {
        console.error('Error in Login Handler:', error);
        return { success: false, message: error };
    }

    // await fetch(`/api/auth/login`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ username, password })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     return data
    // })
    // .catch(error => console.error('Failed to Login (in onSubmit handler): ', error))
}

export async function handleRegister(username: string, password: string) {
    //console.log(`USERNAME AND PASSWORD: ${username} ${password}`)
    try {
        const response = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if(response.status === 409) {
            return { success: false, message: 'Username already exists' };
        }
        if (!response.ok) {
            // If the response is not ok, throw an error with the status text
            const errorText = await response.text();
            throw new Error(`Registration failed: ${errorText}`);
        }
        const data = await response.json();
        return { success: true, data, message: 'Success!' };
    } catch (error) {
        console.error('Error in handleRegister:', error);
        return { success: false, message: error};
    }
}


// DO ERROR HANDLING FOR THIS
export async function handleSubmitOption(form: OptionFormData, choices: {choice: string, odds: number}[], username: string) {
    const fixedForm = (Number(form.minbet) > Number(form.maxbet)) ? {...form, minbet: form.maxbet, maxbet: form.minbet} : form;
    await fetch('/api/submit-option', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...fixedForm, ptwchoices: choices, user: username})
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Failed to post option form (in onSubmit handler): ', error))
}

export async function placeBet(bettorUser: string, optionId: string, betAmount: number, payoutRate: number, side: 'o' | 'u' | 'h' | 'm',) { // ADD THE CONTENT
    // bettorUser: string, optionId: string, betAmount: number, payoutRate: number, side: 'o' | 'u' | 'h' | 'm',
    // Synchronise with API route
    try {
        const response = await fetch(`/api/place-bet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bettorUser, optionId, betAmount, payoutRate, side }),
        });
        if(response.status === 409) {
            return { success: false, message: 'No Money' };
        }
        if (!response.ok) {
            // If the response is not ok, throw an error with the status text
            const errorText = await response.text();
            throw new Error(`Post bet failed failed: ${errorText}`);
        }
        const data = await response.json();
        return { success: true, data, message: 'Success!' };
    } catch (error) {
        console.error('Error in placing bet:', error);
        return { success: false, message: error};
    }
    // Run the postBet - check for successful response
    //
}

export async function placePTWBet(bettorUser: string, optionId: string, betAmount: number, payoutRate: number, winner: number) { // ADD THE CONTENT
    // bettorUser: string, optionId: string, betAmount: number, payoutRate: number, side: 'o' | 'u' | 'h' | 'm',
    // Synchronise with API route
    try {
        const response = await fetch(`/api/place-ptw-bet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bettorUser, optionId, betAmount, payoutRate, winner }),
        });
        if(response.status === 409) {
            return { success: false, message: 'No Money' };
        }
        if (!response.ok) {
            // If the response is not ok, throw an error with the status text
            const errorText = await response.text();
            throw new Error(`Post bet failed failed: ${errorText}`);
        }
        const data = await response.json();
        return { success: true, data, message: 'Success!' };
    } catch (error) {
        console.error('Error in placing bet:', error);
        return { success: false, message: error};
    }
    // Run the postBet - check for successful response
    //
}