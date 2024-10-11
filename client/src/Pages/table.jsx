<>



<table className='overflow-y-auto mt-12 h-full flex flex-col gap-6 w-full text-center'>
<thead className='w-full'>
    <tr className="text-[14px] text-gray-60">
    <th>Services</th>
    <th>Amount</th>
    <th>Total Amount</th>
    <th>Status</th>
    <th>Payment Method</th>
    <th>Transaction No.</th>
    <th>Action</th>
    </tr>
</thead>

<tbody className='flex flex-col gap-4 w-full'>
    {transactionHistroy.map((item) => (
    <tr key={item._id } className='flex flex-col w-full gap-[17px]'>
        <div className='flex items-center w-full'>
            <td className='flex gap-2 items-center'>

                <div className='flex flex-col gap-[10px]'>
                    <h2 className='text-[12px] text-gray-70 font-semibold'>{item.service}</h2>
                    <p className='text-[12px] text-gray-70'>{item.number}</p>
                </div>
            </td>
            <td className='flex items-center text-[12px] text-gray-70 font-semibold' >
                <TbCurrencyNaira className='text-[18px]' />
                {item.amount}
            </td>
            <td className='flex items-center text-[12px] text-gray-70 font-semibold'>{item.totalAmount}</td>
            <td className={`${item.status === 'Successful' ? 'text-success' : item.status === 'Initiated' ? 'text-warning' : 'text-error' } text-[12px] font-semibold`}>{item.status}</td>
            <td className='flex items-center text-[12px] text-gray-70 font-semibold'>{item.paymentMethod}</td>
            <td className='flex flex-col gap-[10px]'>
                <h2 className='flex items-center text-[12px] text-gray-70 font-semibold'>{item.transactionId}</h2>
                <p className='text-[12px] text-gray-70 font-semibold'>{formatDate(item?.createdAt)}</p>
            </td>
            <td className='rounded-[6px] p-2 bg-gray-20 text-second-color text-[16px] font-semibold cursor-pointer'>
                <Link>
                    Open
                </Link>
            </td>

        </div>
        <span className='w-full border-[0.5px] border-gray-30'></span>
    </tr>
    ))}

</tbody>


</table>

/**page tempalte */
<div className="flex w-full min-h-[100vh]">
<div className="relative flex w-[304px] h-full overflow-y-hidden medium-pc:hidden">
    <div className='fixed w-[304px] left-0 top-0 flex h-full'>
        <Sidebar />
    </div>
</div>

<div className='relative flex min-h-full w-[80.5%] medium-pc:w-full justify-center ml-auto'>
    <div className="w-[96%] phone:w-[96%]">
        <div className="mt-6">
            <TopNav toggleMenu={toggleMenu} showMenu={showMenu} title={'Buy Airtime'} />
        </div>
        
        <div className="small-pc:flex-col">

        </div>
    </div>
</div>
</div>
</>
