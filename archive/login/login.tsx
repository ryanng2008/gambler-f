//async function onLogin() { 
    //    await fetch(`/api/auth/login?username=${encodeURIComponent(input)}`, {
    //        method: 'GET',
    //        headers: {
    //            'Content-Type': 'application/json'
    //        },
    //    })
    //    .then(response => response.json())
    //    .then(data => {
    //        if(data.exists) {
    //            setUser(input); // when you fix, it wil\
    //            setMessage(`Successfully logged in as ${input} (until you refresh or leave the page)`)
    //            //console.log(`Successfully logged in as ${input} - user Context: ${user}`)
    //        } else {
    //            setMessage(`Login failed - try to register an account instead`)
    //        }
    //    })
    //    .catch(error => console.error('Failed to Login (in onSubmit handler): ', error))
    //}