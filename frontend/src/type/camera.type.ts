export type Camera = {
    camera_id: number,
    status: number
    name?: string,
    area?: string,
}

export type CameraStatus = Pick<Camera, 'camera_id'>