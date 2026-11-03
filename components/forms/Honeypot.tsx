/**
 * A field no person sees or fills. Bots that auto-complete every input fill
 * it, and the database quietly files their submission as spam instead of
 * opening a ticket for a human to answer. Nothing is stored from this field.
 */
export default function Honeypot() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
