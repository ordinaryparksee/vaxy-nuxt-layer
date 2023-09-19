import moment from 'moment'

export default defineNuxtPlugin(() => {
  class TimeDisplay {
    public MINUTE_AS_SECOND = 60
    public HOUR_AS_SECOND = this.MINUTE_AS_SECOND * 60
    public DAY_AS_SECOND = this.HOUR_AS_SECOND * 24
    public MONTH_AS_SECOND = this.DAY_AS_SECOND * 30
    public YEAR_AS_SECOND = this.DAY_AS_SECOND * 365

    years: number
    months: number
    days: number
    hours: number
    minutes: number
    seconds: number

    constructor (seconds: number) {
      this.years = Math.floor(seconds / this.YEAR_AS_SECOND) * this.YEAR_AS_SECOND
      this.months = Math.floor((seconds - this.years) / this.MONTH_AS_SECOND) * this.MONTH_AS_SECOND
      this.days = Math.floor((seconds - this.years - this.months) / this.DAY_AS_SECOND) * this.DAY_AS_SECOND
      this.hours = Math.floor((seconds - this.years - this.months - this.days) / this.HOUR_AS_SECOND) * this.HOUR_AS_SECOND
      this.minutes = Math.floor((seconds - this.years - this.months - this.days - this.hours) / this.MINUTE_AS_SECOND) * this.MINUTE_AS_SECOND
      this.seconds = seconds - this.years - this.months - this.days - this.hours - this.minutes
    }

    toString (): string {
      const segments: string[] = []
      if (this.years > 0) {
        segments.push(`${this.years / this.YEAR_AS_SECOND}년`)
      }
      if (this.months > 0) {
        segments.push(`${this.months / this.MONTH_AS_SECOND}개월`)
      }
      if (this.days > 0) {
        segments.push(`${this.days / this.DAY_AS_SECOND}일`)
      }
      if (this.hours > 0) {
        segments.push(`${this.hours / this.HOUR_AS_SECOND}시간`)
      }
      if (this.minutes > 0) {
        segments.push(`${this.minutes / this.MINUTE_AS_SECOND}분`)
      }
      if (this.seconds > 0) {
        segments.push(`${this.seconds}초`)
      }
      return segments.join(' ')
    }
  }

  return {
    provide: {
      date: {
        timeDisplay (input: number): string {
          return (new TimeDisplay(input)).toString()
        },
        timeBefore: (input: moment.MomentInput): string => {
          const now = moment()
          const datetime = moment(input)
          const seconds = now.diff(datetime, 'seconds')
          const minutes = now.diff(datetime, 'minutes')
          const hours = now.diff(datetime, 'hours')
          const days = now.diff(datetime, 'days')
          const months = now.diff(datetime, 'months')
          if (minutes < 1) {
            return `${seconds}초 전`
          } else if (hours < 1) {
            return `${minutes}분 전`
          } else if (days < 1) {
            return `${hours}시간 전`
          } else if (months < 1) {
            return `${days}일 전`
          } else {
            return datetime.format('YYYY[-]MM[-]DD')
          }
        }
      }
    }
  }
})
