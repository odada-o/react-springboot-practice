
const PageComponent = ({ serverData, movePage }) => {
    return (
        <div>
            {serverData.prev ? <button onClick={() => movePage({page: serverData.prevPage})}>이전</button> : "<"}

            {serverData.pageNumList.map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={() => movePage({page: pageNum})}
                    className={serverData.current === pageNum ? "font-bold" : ""}
                >
                    {pageNum}
                </button>
            ))}

            {serverData.next ? <button onClick={() => movePage({page: serverData.nextPage})}>다음</button> : ">"}
        </div>
    );
}

export default PageComponent;