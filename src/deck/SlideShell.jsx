function SlideShell({ children, footer, className = "" }) {
  return (
    <section
      className={`
        relative
        flex
        min-h-full
        w-full
        items-center
        justify-center
        overflow-hidden
        px-6
        pb-36
        pt-20
        short:pb-28
        short:pt-14
        sm:px-10
        ${className}
      `}
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">{children}</div>
      {footer}
    </section>
  );
}

export default SlideShell;
