export default function Button({ onClick }) {
  return (
    <button type="button" name="Load more" className="Button" onClick={onClick}>
      <span className="lable">Load more</span>
    </button>
  );
}
