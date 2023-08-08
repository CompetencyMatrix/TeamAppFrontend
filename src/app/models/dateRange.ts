export class DateRange {
  get startDate(): Date {
    return this._startDate;
  }

  set startDate(value: Date) {
    if (value > this._endDate) {
      // TODO: more specific error
      throw Error('Start date must be before End date');
    }
    this._startDate = value;
  }

  get endDate(): Date {
    return this._endDate;
  }

  set endDate(value: Date) {
    if (this._startDate > value) {
      // TODO: more specific error
      throw Error('Start date must be before End date');
    }
    this._endDate = value;
  }

  setRange(startDate: Date, endDate: Date) {
    if (startDate > endDate) {
      // TODO: more specific error
      throw Error('Start date must be before End date');
    }

    this._startDate = startDate;
    this._endDate = endDate;
  }

  private _startDate: Date;
  private _endDate: Date;
  constructor(startDate: Date, endDate: Date) {
    this._startDate = startDate;
    this._endDate = endDate;
  }
}
