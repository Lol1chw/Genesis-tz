export function formatUnixTimestamp(unixTimestamp: number): string {
   const date = new Date(unixTimestamp * 1000)

   const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
   }

   return new Intl.DateTimeFormat('en-US', options).format(date)
}
