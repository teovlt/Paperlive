const request = require('supertest');
const app = require('../src/app');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { uploadProfile } = require('../src/controllers/uploadController');

describe('getProfile', () => {
  const filePath = 'default.gif';
  const existingFile = path.join(__dirname, '../uploads/profile/', filePath);

  it('should return a 404 error if the file does not exist', async () => {
    const res = await request(app).get('/api/upload/profile/non-existent-file.gif');

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'File not found' });
  });

  it('should return the file if it exists', async () => {
    const res = await request(app).get(`/api/upload/profile/${filePath}`);

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('image/gif');
    expect(res.body.toString()).toBe(fs.readFileSync(existingFile).toString());
  });
});

// describe('uploadProfile', () => {
//   const mockTeam = { updateOne: jest.fn().mockResolvedValue({ matchedCount: 1 }) };

//   beforeAll(() => {
//     // mock the Team model
//     jest.mock('../src/models/teamModel', () => ({
//       findById: () => mockTeam,
//     }));
//   });

//   it('should upload a file and update the team profile picture', async () => {
//     // mock the req and res objects
//     const req = {
//       teamId: 'team1',
//       file: { filename: 'test.gif' },
//     };
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//     // call the function
//      uploadProfile(req, res);

//     // assert that the response contains the expected message and filename
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith({
//       message: 'File uploaded successfully',
//       filename: 'test.gif',
//     });

//     // assert that the Team model's updateOne method was called with the correct arguments
//     expect(mockTeam.updateOne).toHaveBeenCalledWith(
//       { _id: 'team1' },
//       { $set: { picture: 'test.gif' } }
//     );
//   });

// it('should return an error if there was a problem uploading the file', async () => {
//   // mock the req and res objects
//   const req = { teamId: 'team1' };
//   const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//   // mock the multer upload middleware to simulate an error
//   const upload = jest.fn().mockImplementation(() => {
//     throw new Error('Upload error');
//   });
//   multer.mockReturnValueOnce({ single: upload });

//   // call the function
//   await uploadProfile(req, res);

//   // assert that the response contains the expected error message
//   expect(res.status).toHaveBeenCalledWith(400);
//   expect(res.json).toHaveBeenCalledWith({
//     message: 'Error uploading file',
//     error: 'Upload error',
//   });

//   // assert that the Team model's updateOne method was not called
//   expect(mockTeam.updateOne).not.toHaveBeenCalled();
// });

// it('should return a 500 error if the update query fails', async () => {
//   // mock the req and res objects
//   const req = {
//     teamId: 'team1',
//     file: { filename: 'test.gif' },
//   };
//   const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

//   // mock the updateOne method to simulate a failure
//   mockTeam.updateOne.mockResolvedValueOnce({ matchedCount: 0 });

//   // call the function
//   await uploadProfile(req, res);

//   // assert that the response contains the expected error message
//   expect(res.status).toHaveBeenCalledWith(500);
//   expect(res.json).toHaveBeenCalledWith({ message: 'Failed to update team profile picture' });
// });
//  });
