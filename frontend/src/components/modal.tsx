export default function FeedbackModal({
  title,
  description,
}: {
  title?: null | string | React.ReactElement;
  description?: null | string | React.ReactElement;
}) {

  return (
    <div className="feedback-widget-modal">
      {(title || description) && (
        <header className="feedback-widget-header">
          {title && <h3 className="feedback-widget-modal-title">{title}</h3>}
          {description && <p>{description}</p>}
        </header>
      )}

      <form
        className="feedback-widget-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >

        <div>
          <button
            className="feedback-widget-form-control"
            type="submit"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}