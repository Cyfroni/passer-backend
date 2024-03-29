const FileService = require("../services/FileService")

const mockPeer = {
  getId: () => {}
}

describe("erasure", () => {
  it("should reconstruct corrupted file", async () => {
    const fileService = new FileService(mockPeer)

    const file = new Array(50).join("abc")
    // console.log(file)

    let { chunks, ...info } = await fileService.createChunks(file)
    // console.log(chunks)

    chunks = chunks.map(a => Buffer.from(a.data))
    chunks[3] = undefined
    chunks[2] = undefined
    // console.log(chunks)

    console.log(info)
    let result = await fileService.combineChunks(chunks, info)
    // console.log(result)

    expect(result).toBe(file)
  })
})
