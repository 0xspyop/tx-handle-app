import {ConnectButton} from '@rainbow-me/rainbowkit';
import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useAccount, useSendTransaction} from "wagmi";
import {useState} from "react";

const Home: NextPage = () => {
    const {address} = useAccount()
    const [nonce, setNonce] = useState(0)
    const [price, setPrice] = useState(BigInt(0))
    const {sendTransactionAsync} = useSendTransaction()
    console.log('nonce', nonce)
    const send = async () => {
        try {
            if (!address) return;
            const tx = await sendTransactionAsync({
                to: address,
                value: BigInt(0),
                nonce: +nonce,
                type: "eip1559",
                gasPrice: price
            })
            console.log(tx)
        } catch (e: any) {
            alert(e.message)
        }
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>RainbowKit App</title>
                <meta
                    content="Generated by @rainbow-me/create-rainbowkit"
                    name="description"
                />
                <link href="/favicon.ico" rel="icon"/>
            </Head>

            <main className={styles.main}>
                <ConnectButton/>
                <input type="number" placeholder="nonce" className="mt-4"
                       onChange={(e: any) => setNonce(e.target.value)}/>

                <input type="text" placeholder="gasPrice" className="mt-2"
                       onChange={(e) => setPrice(BigInt(+e.target.value))}/>
                <button onClick={send}>confirm</button>
            </main>
        </div>
    );
};

export default Home;
