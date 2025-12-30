using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JWT_ELMS.Data.Migrations
{
    /// <inheritdoc />
    public partial class adddepartmentinleavereq : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DepartmentId",
                table: "LeaveRequests",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LeaveRequests_DepartmentId",
                table: "LeaveRequests",
                column: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_LeaveRequests_Departments_DepartmentId",
                table: "LeaveRequests",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "DepartmentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeaveRequests_Departments_DepartmentId",
                table: "LeaveRequests");

            migrationBuilder.DropIndex(
                name: "IX_LeaveRequests_DepartmentId",
                table: "LeaveRequests");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "LeaveRequests");
        }
    }
}
