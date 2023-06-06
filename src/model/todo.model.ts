// export class Todo {
//   public todo: String = '';
//   public done: Boolean = false;
//   public id: Number = 1;
// }

export class Todo {
  constructor(
    public id: Number,
    public task: String,
    public done: Boolean,
  ) {}

}