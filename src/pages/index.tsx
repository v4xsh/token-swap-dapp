import dynamic from 'next/dynamic';

import Layout from '@/components/Layout';

const SwapAToB = dynamic(() => import('@/components/SwapAToB'), { ssr: false });
const SwapBToA = dynamic(() => import('@/components/SwapBToA'), { ssr: false });

const FetchTxLogs = dynamic(() => import('@/components/FetchTxLogs'), {
  ssr: false
});

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col h-screen mt-36 mb-24">
        <div className="mx-auto text-center border border-zinc-600 rounded-2xl py-14 px-36 inline-block">
          <div className="flex flex-col gap-8">
            <div id="connected">YES</div>
            <SwapAToB />
            <SwapBToA />
          </div>
        </div>
        {/* <FetchTxLogs /> */}
      </div>
    </Layout>
  );
}
