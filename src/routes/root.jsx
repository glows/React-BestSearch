import './root.css';
import Head from '../components/Head';
import SearchWrap from '../components/Search';

export default function Root() {
  
    return (
        <>
            <Head></Head>
            <div className='content'>
                <div className='trend-title' > <span>Sreach</span> Trends</div>
                <SearchWrap />
            </div>
        </>
    );
}