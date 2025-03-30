import useCustomMove from "../../hooks/useCustomMove";

const initialState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const ListComponent = () => {

    const {page, size} = useCustomMove()

    const [serverDate, setServerDate] = useState(initialState)


}