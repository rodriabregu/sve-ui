<script lang="ts">
  import { Calendar } from 'bits-ui';
  import type { ComponentProps } from 'svelte';

  type BitsProps = ComponentProps<typeof Calendar.Day>;

  interface Props extends Omit<BitsProps, 'class'> {
    /** Extra classes merged onto the day. */
    class?: string;
  }

  let { class: cls, children, ...rest }: Props = $props();
</script>

<!--
  The interactive day. Bits sets the state as data attributes, and the
  distinctions matter:

    data-selected           chosen
    data-today              today, which must be visible even when not selected
    data-disabled           outside min/max, or explicitly disabled
    data-unavailable        exists but cannot be picked — a fully booked day
    data-outside-month      a leading/trailing day from the adjacent month
    data-focused            keyboard focus within the roving grid

  `unavailable` and `disabled` are different answers and are styled
  differently: a struck-through unavailable day tells the user the date exists
  but is taken, whereas a greyed-out disabled day says it is out of range.
  Collapsing them into one grey blur loses that.
-->
<Calendar.Day
  class={['sve-calendar__day', cls].filter(Boolean).join(' ')}
  data-slot="calendar-day"
  {children}
  {...rest}
/>

<style>
  :global(.sve-calendar__day) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border: 1px solid transparent;
    border-radius: var(--sve-radius-md);
    background-color: transparent;
    font-family: inherit;
    font-size: var(--sve-font-size-sm);
    color: var(--sve-color-default-foreground);
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  :global(.sve-calendar__day:hover:not([data-disabled]):not([data-unavailable])) {
    background-color: var(--sve-color-default);
  }

  /* Today gets a ring rather than a fill, so it stays legible when it is also
     the selected day. */
  :global(.sve-calendar__day[data-today]) {
    border-color: var(--sve-color-primary-border);
    font-weight: var(--sve-font-weight-bold);
  }

  :global(.sve-calendar__day[data-selected]) {
    background-color: var(--sve-color-primary);
    border-color: var(--sve-color-primary);
    color: var(--sve-color-primary-foreground);
  }

  /* Bits drives focus with a roving tabindex, so the ring has to follow
     data-focused as well as :focus-visible. */
  :global(.sve-calendar__day[data-focused]),
  :global(.sve-calendar__day:focus-visible) {
    outline: 2px solid var(--sve-color-primary);
    outline-offset: 2px;
  }

  /* Out of range: nothing to reason about, so fade it out. */
  :global(.sve-calendar__day[data-disabled]) {
    opacity: 0.35;
    cursor: not-allowed;
  }

  /* Exists but taken: keep it readable and strike it, which reads as
     "that date is gone" rather than "that date does not exist". */
  :global(.sve-calendar__day[data-unavailable]) {
    color: var(--sve-color-danger);
    text-decoration: line-through;
    cursor: not-allowed;
  }

  :global(.sve-calendar__day[data-outside-month]) {
    opacity: 0.4;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.sve-calendar__day) {
      transition: none;
    }
  }
</style>
