const {default: Grid} = require("services/grid");
const fixtures = require("fixtures/grids");
describe("Grid serivce test suite", function() {

  let grid = null;

  function testName(expectation) {
    let {width, height, left, top} = expectation;
    return `should should occupy a ${width}x${height} spot at ${left}, ${top}`;
  }

  function run({params, inserts, expects}) {

    function runInsert({rowspan, colspan}, expectation) {
      let test_name = testName(expectation);

      it(test_name, function() {
        let {width, height, top, left} = grid.occupy(colspan, rowspan);
        expect(width).toBe(expectation.width);
        expect(height).toBe(expectation.height);
        expect(top).toBe(expectation.top);
        expect(left).toBe(expectation.left);
      });
    }

    describe(`${params.height}x${params.width} grid`, function() {

      beforeAll(function() {
        grid = new Grid(params.width, params.height, params.columns);
      });

      for(let i = 0, c = inserts.length; i < c; i++) {
        runInsert(inserts[i], expects[i]);
      }

    });

  }

  for(let i = 0, c = fixtures.length; i < c; i++) {
    run(fixtures[i]);
  }

  describe("basic test suite", function() {

    beforeEach(function() {
      grid = new Grid(100, 200, 10);
    });

    afterEach(function() {
    });

    it("should return the appropriate columns", function() {
      expect(grid.columns).toBe(10);
    });

    it("should return the appropriate rows", function() {
      expect(grid.rows).toBe(20);
    });

    it("should return the correct bounding box when occupying the first item", function() {
      let {width, height, left, top} = grid.occupy(1,1);
      expect(left).toBe(0);
      expect(top).toBe(0);
      expect(width).toBe(10);
      expect(height).toBe(10);
    });

    it("should move on after the first item", function() {
      grid.occupy(1,1);
      let {width, height, left, top} = grid.occupy(2,2);
      expect(left).toBe(10);
      expect(top).toBe(0);
      expect(width).toBe(20);
      expect(height).toBe(20);
    });

  });

});
