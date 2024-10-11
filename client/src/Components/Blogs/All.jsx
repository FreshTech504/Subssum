import { Link } from "react-router-dom"
import { blog } from "../../Data/blog"


function All() {
    function truncateText(text, maxLength) {
        if (text.length <= maxLength) {
            return text;
        }
    
        const truncated = text.slice(0, maxLength);
        const lastSpaceIndex = truncated.lastIndexOf(' ');
        
        // Adjust to the last space to avoid cutting off in the middle of a word
        const result = lastSpaceIndex > -1 ? truncated.slice(0, lastSpaceIndex) : truncated;
    
        return result + '...';
    }

    const formatDate = (createdAt) => {
        const date = new Date(createdAt);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
    };

  return (
    <div className="grid grid-cols-2 gap-[20px] justify-between items-center small-pc:grid-cols-1">
        {
           blog.map((item) => (
                <Link to={`/blog/${item?._id}`} key={item?._id} className="flex phone:flex-col items-center flex-1 gap-6 border-[1px] border-gray-30 p-3 rounded-[24px] mb-3">
                    <img alt={item?.title} src={item?.image} className="w-[240px] rounded-[12px]" />

                    <div className="flex flex-col gap-6">
                        <h3 className="text-[20px] font-semibold text-gray-60" >{item?.title}</h3>

                        <div className="flex flex-col gap-4">
                            <p className="text-[14px] font-normal text-gray-80">{truncateText(item?.text, 300)}</p>

                            <span className="text-[14px] text-gray-50 font-normal">{formatDate(item?.createdAt)}</span>
                        </div>
                    </div>
                </Link>
           ))
        }
    </div>
  )
}

export default All