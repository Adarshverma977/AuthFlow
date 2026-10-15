function Card({
  children,
  title,
  description,
  className = "",
}) {
  return (
    <section className={`card ${ className } `.trim()}>
      {(title || description) && (
        <div className="card-header">
          {title && <h2 className="card-title">{title}</h2>}

          {description && (
            <p className="card-description">{description}</p>
          )}
        </div>
      )}

      <div className="card-body">{children}</div>
    </section>
  );
}

export default Card;