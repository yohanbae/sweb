import React, {useEffect, useState} from "react";
import firebase from "../../base";
import { toast } from 'react-toastify';
import ShopPresenter from "./ShopPresenter";


let money = 0;
let uid;
const Shop = ({history}) => {
    const [loaded, setLoaded] = useState(false);

    // const [money, setMoney] = useState(0);
    const [minus, setMinus] = useState(false);
    const [spendAmount, setSpendAmount] = useState(0);

    const [showOrder, setShowOrder] = useState(false);
    const [showNoMoney, setShowNoMoney] = useState(false);
    const [itemPicked, setItemPicked] = useState("");
    const [itemPrice, setItemPrice] = useState(0);

    // const [userUid, setUserUid] = useState("");
    const [theData, setTheData] = useState([]);

    // Items
    const [ownCat, setOwnCat] = useState(false);
    const [ownOri, setOwnOri] = useState(false);
    const [ownDog, setOwnDog] = useState(false);
    const [ownBaby, setOwnBaby] = useState(false);
    const [ownMonkey, setOwnMonkey] = useState(false);

    const db = firebase.firestore();

    useEffect(() => {
        if(localStorage.getItem('smileweb')){
            uid = localStorage.getItem('smileweb');
            // setUserUid(uid);
        }else{
            history.push('/');
        }

        if(uid){
            db.collection("smileland").doc(uid).get().then(doc => {
                let user = doc.data();
                setTheData(user);
                money = user.money;

                let theCat = user.item.find(val => val.name === 'cat');
                let theDog = user.item.find(val => val.name === 'dog');
                let theMonkey = user.item.find(val => val.name === 'monkey');
                let theBaby = user.item.find(val => val.name === 'baby');
                let theOri = user.item.find(val => val.name === 'ori');

                if (theCat.own === true) setOwnCat(true);
                if (theDog.own === true) setOwnDog(true);
                if (theMonkey.own === true) setOwnMonkey(true);
                if (theBaby.own === true) setOwnBaby(true);
                if (theOri.own === true) setOwnOri(true);
                
                setLoaded(true);
            });
        }
        // return () => info();
    }, []);


    const moneySpend = total => {
        setMinus(true);
        setSpendAmount(total);

        setTimeout(() => {
            setMinus(false);
        }, 1000);
    }


    const onOrder = (item, price) => {
        (money >= price) ? displayOrder(item, price) : setShowNoMoney(true);        
    }

    const displayOrder = (item, price) => {
        setShowOrder(true);
        setItemPicked(item);
        setItemPrice(price);
    }

    const placeOrder = () => {
        let data = theData;
        data.item.map(val => {
            if(val.name === itemPicked) val.own = true;
            return null;
        });
        data.money = money - itemPrice;
        setTheData(data);

        money = money - itemPrice;
        moneySpend(itemPrice);

        db.collection("smileland").doc(uid).update({
            item: data.item,
            money: money
        });

        if (itemPicked === "cat") setOwnCat(true);
        if (itemPicked === "dog") setOwnDog(true);
        if (itemPicked === "monkey") setOwnMonkey(true);
        if (itemPicked === "baby") setOwnBaby(true);
        if (itemPicked === "ori") setOwnOri(true);

        toast.success(`구입 완료`, {hideProgressBar: true});  

        // After all process done
        displayOrderClose();
    }

    const displayOrderClose = () => setShowOrder(false);
    const displayNoMoneyClose = () => setShowNoMoney(false);
    const onShop = () => history.push('/shop');    
    const onAbout = () => history.push('/about');
    const onMain = () => history.push('/');
    

    return (
        <ShopPresenter 
            loaded={loaded}
            showOrder={showOrder}
            showNoMoney={showNoMoney}
            money={money}
            minus={minus}
            spendAmount={spendAmount}
            ownOri={ownOri}
            ownCat={ownCat}
            ownDog={ownDog}
            ownBaby={ownBaby}
            ownMonkey={ownMonkey}
            
            displayOrderClose={displayOrderClose}
            placeOrder={placeOrder}
            displayNoMoneyClose={displayNoMoneyClose}
            onAbout={onAbout}
            onShop={onShop}
            onMain={onMain}
            onOrder={onOrder}
            moneySpend={moneySpend}        
        ></ShopPresenter>
    );

}
export default Shop;