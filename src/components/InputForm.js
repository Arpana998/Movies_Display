import './InputForm.css';
import { useRef } from 'react';



const InputForm = (props) => {
    const  titleRef = useRef('');
    const  openingTextRef = useRef('');
    const  releaseDateRef = useRef('');

    const inputHandler = (event) => {
        event.preventDefault();
        console.log(titleRef.current.value)
        const movie = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value
        }
      props.onAddMovie(movie)
    }
    return(
        <div className="container">
        <form action="action_page" onSubmit = {inputHandler}>

        <label htmlFor="title">Title</label>
        <input type="text" id="ftitle" ref={titleRef}/>

        <label htmlFor="openingtext">Opening Text</label>
        <input type="text" id="fopeningtext" ref={openingTextRef}/>

        <label htmlFor="releasedate">Release Date</label>
        <input type="text" id="freleasedate" ref={releaseDateRef}/>

        <span id='button'>
            <button>Add Movie</button>
        </span>
    </form>

</div>
    )

}

export default InputForm;
