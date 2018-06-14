export class AvatarUpload {
  $key?: string
  file: File
  name: string
  url: string
  email: string
  progress: number
  created: Date = new Date()
  uid: string

  constructor (file: File) {
    this.file = file
  }
}
