// 'use server';
// import AuthContext from "@/app/context/authContext";
// import { fetchUser } from "@/app/lib/data/getData";
// import { useContext } from "react";
// import Navbar from '../src/app/ui/home/navbar'

//interface User {
//    id: string,
//    username: string,
//    password: string
//    balance: number
//}
//
//export default async function NavbarWrapper() {
//    const username = useContext(AuthContext);
//    const userObject = await fetchUser(username);
//    return (
//        <Navbar balance={userObject.balance || 0}/>
//    )
//}


    //useEffect(() => {
    //    async () => {
    //        console.log('ran again')
    //        try {
    //            const fetchedUserObject = await fetchUser(user);
    //            setUserObject(fetchedUserObject);
    //        } catch (error) {
    //            console.error('Error fetching user in the useEffect: ', error)
    //        }
    //        
    //    }
    //}, [user])